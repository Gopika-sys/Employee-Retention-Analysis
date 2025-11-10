from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import pandas as pd
import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employee_retention.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max file size

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs('data', exist_ok=True)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.String(20), default='user')

class MLModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    model_name = db.Column(db.String(100), nullable=False)
    accuracy = db.Column(db.Float)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

# Helper Functions
def create_visualization(df, viz_type):
    """Create visualizations for data analysis"""
    plt.style.use('seaborn-v0_8')
    fig, ax = plt.subplots(figsize=(10, 6))
    
    if viz_type == 'satisfaction_distribution':
        sns.histplot(data=df, x='satisfaction_level', bins=30, ax=ax)
        ax.set_title('Distribution of Employee Satisfaction Levels')
    elif viz_type == 'department_attrition':
        attrition_by_dept = df.groupby('sales')['left'].mean().sort_values(ascending=False)
        sns.barplot(x=attrition_by_dept.values, y=attrition_by_dept.index, ax=ax)
        ax.set_title('Attrition Rate by Department')
        ax.set_xlabel('Attrition Rate')
    elif viz_type == 'salary_vs_attrition':
        salary_order = ['low', 'medium', 'high']
        sns.countplot(data=df, x='salary', hue='left', order=salary_order, ax=ax)
        ax.set_title('Salary Level vs Attrition')
    
    # Convert plot to base64 string
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png', bbox_inches='tight')
    img_buffer.seek(0)
    img_data = base64.b64encode(img_buffer.getvalue()).decode()
    plt.close()
    
    return img_data

def preprocess_data(df):
    """Preprocess the employee data for ML model"""
    # Handle missing values
    df = df.fillna(df.mean(numeric_only=True))
    
    # Encode categorical variables
    le_dept = LabelEncoder()
    le_salary = LabelEncoder()
    
    df['Department_encoded'] = le_dept.fit_transform(df['sales'])
    df['salary_encoded'] = le_salary.fit_transform(df['salary'])
    
    # Select features for model
    feature_columns = [
        'satisfaction_level', 'last_evaluation', 'number_project',
        'average_montly_hours', 'time_spend_company', 'Work_accident',
        'promotion_last_5years', 'Department_encoded', 'salary_encoded'
    ]
    
    X = df[feature_columns]
    y = df['left']
    
    return X, y, le_dept, le_salary

# Routes
@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        # Check if user already exists
        if User.query.filter_by(username=username).first():
            flash('Username already exists')
            return redirect(url_for('register'))
        
        if User.query.filter_by(email=email).first():
            flash('Email already registered')
            return redirect(url_for('register'))
        
        # Create new user
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        
        flash('Registration successful! Please login.')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = User.query.filter_by(username=username).first()
        
        if user and bcrypt.check_password_hash(user.password, password):
            session['user_id'] = user.id
            session['username'] = user.username
            flash(f'Welcome back, {username}!')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.')
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    # Get user's models
    user_models = MLModel.query.filter_by(created_by=session['user_id']).all()
    
    return render_template('dashboard.html', models=user_models)

@app.route('/data_analysis')
def data_analysis():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    # Load sample data or uploaded data
    sample_data_path = 'data/HR_comma_sep.csv'
    if os.path.exists(sample_data_path):
        df = pd.read_csv(sample_data_path)
        
        # Create visualizations
        viz1 = create_visualization(df, 'satisfaction_distribution')
        viz2 = create_visualization(df, 'department_attrition')
        viz3 = create_visualization(df, 'salary_vs_attrition')
        
        # Basic statistics
        total_employees = len(df)
        attrition_rate = df['left'].mean() * 100
        avg_satisfaction = df['satisfaction_level'].mean()
        
        stats = {
            'total_employees': total_employees,
            'attrition_rate': round(attrition_rate, 2),
            'avg_satisfaction': round(avg_satisfaction, 2)
        }
        
        return render_template('data_analysis.html', 
                             visualizations=[viz1, viz2, viz3],
                             stats=stats)
    else:
        flash('No data available. Please upload a dataset first.')
        return render_template('data_analysis.html', visualizations=[], stats={})

@app.route('/train_model', methods=['GET', 'POST'])
def train_model():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        try:
            # Load data
            data_path = 'data/HR_comma_sep.csv'
            if not os.path.exists(data_path):
                flash('Dataset not found. Please upload data first.')
                return redirect(url_for('train_model'))
            
            df = pd.read_csv(data_path)
            
            # Preprocess data
            X, y, le_dept, le_salary = preprocess_data(df)
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42, stratify=y
            )
            
            # Scale features
            scaler = StandardScaler()
            X_train_scaled = scaler.fit_transform(X_train)
            X_test_scaled = scaler.transform(X_test)
            
            # Train model
            model = RandomForestClassifier(
                n_estimators=100,
                random_state=42,
                max_depth=10,
                min_samples_split=5
            )
            model.fit(X_train_scaled, y_train)
            
            # Make predictions
            y_pred = model.predict(X_test_scaled)
            accuracy = accuracy_score(y_test, y_pred)
            
            # Save model and preprocessors
            model_data = {
                'model': model,
                'scaler': scaler,
                'le_dept': le_dept,
                'le_salary': le_salary
            }
            
            os.makedirs('models', exist_ok=True)
            model_filename = f'models/employee_retention_model_{session["user_id"]}.pkl'
            with open(model_filename, 'wb') as f:
                pickle.dump(model_data, f)
            
            # Save model info to database
            ml_model = MLModel(
                model_name=f'RandomForest_Model_{session["user_id"]}',
                accuracy=accuracy,
                created_by=session['user_id']
            )
            db.session.add(ml_model)
            db.session.commit()
            
            flash(f'Model trained successfully! Accuracy: {accuracy:.2%}')
            return redirect(url_for('dashboard'))
            
        except Exception as e:
            flash(f'Error training model: {str(e)}')
            return redirect(url_for('train_model'))
    
    return render_template('train_model.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        try:
            # Load model
            model_filename = f'models/employee_retention_model_{session["user_id"]}.pkl'
            if not os.path.exists(model_filename):
                flash('No trained model found. Please train a model first.')
                return redirect(url_for('train_model'))
            
            with open(model_filename, 'rb') as f:
                model_data = pickle.load(f)
            
            model = model_data['model']
            scaler = model_data['scaler']
            le_dept = model_data['le_dept']
            le_salary = model_data['le_salary']
            
            # Get form data
            satisfaction_level = float(request.form['satisfaction_level'])
            last_evaluation = float(request.form['last_evaluation'])
            number_project = int(request.form['number_project'])
            average_monthly_hours = int(request.form['average_monthly_hours'])
            time_spend_company = int(request.form['time_spend_company'])
            work_accident = int(request.form['work_accident'])
            promotion_last_5years = int(request.form['promotion_last_5years'])
            department = request.form['department']
            salary_level = request.form['salary']
            
            # Encode categorical variables
            try:
                dept_encoded = le_dept.transform([department])[0]
                salary_encoded = le_salary.transform([salary_level])[0]
            except ValueError:
                flash('Invalid department or salary level.')
                return redirect(url_for('predict'))
            
            # Create feature array
            features = np.array([[
                satisfaction_level, last_evaluation, number_project,
                average_monthly_hours, time_spend_company, work_accident,
                promotion_last_5years, dept_encoded, salary_encoded
            ]])
            
            # Scale features
            features_scaled = scaler.transform(features)
            
            # Make prediction
            prediction = model.predict(features_scaled)[0]
            probability = model.predict_proba(features_scaled)[0]
            
            result = {
                'prediction': 'Likely to Leave' if prediction == 1 else 'Likely to Stay',
                'probability_leave': round(probability[1] * 100, 2),
                'probability_stay': round(probability[0] * 100, 2)
            }
            
            return render_template('predict.html', result=result)
            
        except Exception as e:
            flash(f'Error making prediction: {str(e)}')
            return redirect(url_for('predict'))
    
    return render_template('predict.html')

@app.route('/upload_data', methods=['GET', 'POST'])
def upload_data():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        try:
            print("Upload POST request received")  # Debug
            print("Files in request:", list(request.files.keys()))  # Debug
            
            # Check if file is in request
            if 'file' not in request.files:
                print("No 'file' key in request.files")  # Debug
                flash('No file selected', 'error')
                return redirect(request.url)
            
            file = request.files['file']
            print(f"File object: {file}")  # Debug
            print(f"Filename: {file.filename}")  # Debug
            
            if file.filename == '':
                print("Empty filename")  # Debug
                flash('No file selected', 'error')
                return redirect(request.url)
            
            # Validate file type
            if not file.filename.lower().endswith('.csv'):
                flash('Please upload a CSV file only', 'error')
                return redirect(request.url)
            
            if file:
                # Save the file
                filename = secure_filename(file.filename)
                filepath = os.path.join('data', 'HR_comma_sep.csv')
                file.save(filepath)
                
                # Validate CSV content
                try:
                    df = pd.read_csv(filepath)
                    if len(df) == 0:
                        flash('The uploaded CSV file is empty', 'error')
                        return redirect(request.url)
                    
                    # Check for required columns
                    required_columns = ['satisfaction_level', 'last_evaluation', 'number_project', 
                                      'average_montly_hours', 'time_spend_company', 'Work_accident', 
                                      'left', 'promotion_last_5years', 'sales', 'salary']
                    
                    missing_columns = [col for col in required_columns if col not in df.columns]
                    if missing_columns:
                        flash(f'Missing required columns: {", ".join(missing_columns)}', 'error')
                        return redirect(request.url)
                    
                    flash(f'Dataset uploaded successfully! Found {len(df)} records with {len(df.columns)} columns.', 'success')
                    return redirect(url_for('data_analysis'))
                    
                except pd.errors.EmptyDataError:
                    flash('The uploaded file is not a valid CSV file', 'error')
                    return redirect(request.url)
                except Exception as e:
                    flash(f'Error reading CSV file: {str(e)}', 'error')
                    return redirect(request.url)
                    
        except Exception as e:
            flash(f'Upload failed: {str(e)}', 'error')
            return redirect(request.url)
    
    return render_template('upload_data.html')

@app.route('/simple_upload', methods=['GET', 'POST'])
def simple_upload():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        print("=== SIMPLE UPLOAD DEBUG ===")
        print("Form data:", request.form)
        print("Files:", request.files)
        
        if 'file' in request.files:
            file = request.files['file']
            print(f"File: {file}")
            print(f"Filename: {file.filename}")
            print(f"Content type: {file.content_type}")
            
            if file.filename:
                flash(f'File received: {file.filename}', 'success')
                return redirect(url_for('simple_upload'))
        
        flash('No file received', 'error')
        return redirect(url_for('simple_upload'))
    
    return render_template('simple_upload.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)