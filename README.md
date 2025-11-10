# Employee Retention Project, Data Analysis & Insights
![Data Analysis](Screen_Shots/Screenshot%202025-09-28%20131432.png)
*Interactive analytics dashboard showing 14,999 total employees, 23.81% attrition rate, 0.61 average satisfaction, with detailed visualizations for satisfaction distribution, attrition by department, salary vs attrition, plus high-risk and retention factors analysis*ystem

**Login Interface**
![Login Page](Screen_Shots/Screenshot%202025-09-28%20131323.png)
*Secure login system with demo credentials (Username: demo, Password: demo123) and professional styling*

**Registration Interface**
![Register Page](Screen_Shots/Screenshot%202025-09-28%20131330.png)
*User registration with comprehensive form validation, email verification, and terms acceptance*n System

[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.1.2-green.svg)](https://flask.palletsprojects.com/)
[![Machine Learning](https://img.shields.io/badge/ML-Random%20Forest-orange.svg)](https://scikit-learn.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1.3-purple.svg)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive Machine Learning web application that predicts employee retention using advanced analytics and interactive visualizations. Built with Flask, scikit-learn, and modern web technologies.

## 🌟 Features

- 🔐 **Secure Authentication System** - User registration and login with bcrypt encryption
- 📊 **Interactive Data Analytics** - Comprehensive data exploration with visualizations
- 🤖 **ML Model Training** - Random Forest classifier with 98.2% accuracy
- 📈 **Real-time Predictions** - Individual employee retention likelihood assessment  
- 📤 **Drag & Drop Upload** - Easy CSV file upload with validation
- 📱 **Responsive Design** - Modern, mobile-friendly interface
- 🎨 **Professional UI/UX** - Clean, intuitive dashboard design

## 📸 Application Screenshots

### 🏠 Landing Page
![Landing Page](Screen_Shots/Screenshot%202025-09-28%20131310.png)
*Modern landing page showcasing Employee Retention Prediction System with 23.8% industry average attrition rate and $4,129 average cost per employee*


### 📊 Dashboard Overview
![Dashboard](Screen_Shots/Screenshot%202025-09-28%20131419.png)
*Comprehensive dashboard displaying 2 trained models, 98.2% best accuracy, 30 predictions made, with quick action buttons for Upload Data, Analyze Data, Train Model, and Make Prediction*

### � Data Analysis
![Data Analysis](Screen_Shots/data-analysis.png)
*Interactive data visualizations including satisfaction distribution, department attrition rates, and key insights*

### 🤖 Model Training Interface
![Model Training](Screen_Shots/Screenshot%202025-09-28%20131441.png)
*Random Forest Classifier training interface showing 5-step training process, expected 95-98% accuracy, model configuration with ensemble methods, and comprehensive training tips for data quality and balanced datasets*

### 🎯 Employee Prediction System
![Prediction](Screen_Shots/Screenshot%202025-09-28%20131448.png)
*Individual employee retention prediction interface with satisfaction level, evaluation score, number of projects, monthly hours, work accident history, promotions, department, and salary level inputs. Shows real-time model performance: 92.3% accuracy, 9.7% precision, 87.6% recall, 83.3% F1-Score*

### 📤 Data Upload Interface
![Upload Data](Screen_Shots/Screenshot%202025-09-28%20131454.png)
*Drag-and-drop CSV upload interface with comprehensive data format requirements (satisfaction_level, last_evaluation, number_project, etc.), file validation (50MB max), security features including secure upload, anonymized data, and automatic data cleanup*

## 🚀 Quick Start

### Prerequisites
- Python 3.13+
- pip package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dharaneesh20/Employee-Retention-Analaysis.git
   cd Employee-Retention-Analaysis
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database**
   ```bash
   python app.py
   ```

5. **Access the application**
   - Open your browser and go to `http://localhost:5000`
   - Create an account or use demo credentials:
     - Username: `demo`
     - Password: `demo123`

## 📊 Dataset Requirements

The system expects CSV files with the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `satisfaction_level` | Float (0.0-1.0) | Employee satisfaction rating |
| `last_evaluation` | Float (0.0-1.0) | Most recent performance evaluation |
| `number_project` | Integer (1-10) | Number of projects assigned |
| `average_montly_hours` | Integer | Average monthly working hours |
| `time_spend_company` | Integer | Years with the company |
| `Work_accident` | Binary (0/1) | Workplace accident history |
| `left` | Binary (0/1) | Target variable (1=left, 0=stayed) |
| `promotion_last_5years` | Binary (0/1) | Recent promotion history |
| `sales` | String | Department name |
| `salary` | String | Salary level (low/medium/high) |

### Sample Dataset
A sample HR dataset with 15,000 employee records is included in the `Sample Test Data/` directory.
  - `satisfaction_level` (0.0-1.0)
  - `last_evaluation` (0.0-1.0)
  - `number_project` (integer)
  - `average_montly_hours` (integer)
  - `time_spend_company` (years)
  - `Work_accident` (0 or 1)
  - `left` (0=stayed, 1=left)
  - `promotion_last_5years` (0 or 1)
  - `Department` (string)
  - `salary` (low/medium/high)

### 3. Analyze Data
- View interactive visualizations
- Understand employee satisfaction patterns
- Analyze attrition by department and salary
- Get actionable insights

### 4. Train ML Model
- Automatically preprocess your data
- Train Random Forest model
- View model accuracy and performance
- Save trained model for predictions

### 5. Make Predictions
- Enter individual employee details
- Get probability scores for retention
- Receive risk assessment
- Get personalized recommendations

## Project Structure

```
aiml_g/
├── app.py                 # Main Flask application
├── config.py             # Configuration settings
├── requirements.txt      # Python dependencies
├── README.md            # Project documentation
├── data/                # Sample datasets
│   └── HR_comma_sep.csv
├── templates/           # HTML templates
│   ├── base.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── data_analysis.html
│   ├── train_model.html
│   ├── predict.html
│   └── upload_data.html
├── static/              # Static assets
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── models/              # Trained ML models (created automatically)
├── uploads/             # Uploaded files (created automatically)
└── instance/            # Database files (created automatically)
```

## Technology Stack

### Backend
- **Flask** - Web framework
- **SQLAlchemy** - Database ORM
- **Flask-Bcrypt** - Password hashing
- **scikit-learn** - Machine learning
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **matplotlib** - Data visualization
- **seaborn** - Statistical visualization

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling
- **JavaScript** - Interactivity
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons

### Database
- **SQLite** - Development database
- **PostgreSQL** - Production ready (configurable)

## Model Details

### Algorithm
- **Random Forest Classifier** with 100 estimators
- **Max depth**: 10
- **Min samples split**: 5
- **Random state**: 42 for reproducibility

### Features Used
1. Satisfaction Level (0.0-1.0)
2. Last Evaluation Score (0.0-1.0)
3. Number of Projects (integer)
4. Average Monthly Hours (integer)
5. Time with Company (years)
6. Work Accidents (binary)
7. Recent Promotions (binary)
8. Department (encoded)
9. Salary Level (encoded)

### Performance
- **Typical Accuracy**: 85-95%
- **Training/Test Split**: 80/20
- **Cross Validation**: Stratified split
- **Preprocessing**: Feature scaling and encoding

## Security Features

- Password hashing with bcrypt
- Session management
- CSRF protection ready
- File upload validation
- SQL injection prevention
- XSS protection

## Configuration

### Environment Variables
Create a `.env` file for customization:

```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///employee_retention.db
UPLOAD_FOLDER=uploads
MODEL_FOLDER=models
FLASK_DEBUG=False
```

### Production Deployment
For production deployment:

1. Set `FLASK_DEBUG=False`
2. Use a strong `SECRET_KEY`
3. Configure a production database (PostgreSQL)
4. Set up proper file permissions
5. Use a WSGI server (Gunicorn, uWSGI)
6. Configure reverse proxy (Nginx)

## Sample Data

The application includes a sample HR dataset with 82 employee records. You can also download larger datasets from:
- [Kaggle HR Analytics Dataset](https://www.kaggle.com/datasets/liujiaqi/hr-comma-sepcsv)
- Create your own CSV following the required format

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

## 🛠️ Technology Stack

### Backend
- **Flask 3.1.2** - Web framework
- **SQLAlchemy** - Database ORM
- **scikit-learn 1.7.2** - Machine learning
- **pandas 2.3.2** - Data manipulation
- **matplotlib/seaborn** - Data visualization
- **bcrypt** - Password hashing

### Frontend
- **HTML5/CSS3** - Markup and styling
- **Bootstrap 5.1.3** - Responsive framework
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons

### Database
- **SQLite** - Development database
- **PostgreSQL/MySQL** - Production ready

## 🏗️ Project Structure

```
Employee-Retention-Analaysis/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── COMMIT_GUIDE.md       # Git commit guidelines
├── README.md             # Project documentation
├── Screen_Shots/         # Application screenshots
├── templates/            # HTML templates
│   ├── base.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── data_analysis.html
│   ├── train_model.html
│   ├── predict.html
│   └── upload_data.html
├── static/               # Static assets
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   └── js/
│       ├── main.js       # Core JavaScript
│       └── upload.js     # Upload functionality
├── data/                 # Data storage
├── models/               # Trained ML models
├── uploads/              # File uploads
├── instance/             # Database files
└── Sample Test Data/     # Sample datasets
```

## 🤖 Machine Learning Pipeline

### 1. Data Preprocessing
- **Missing Value Handling** - Automatic imputation for numerical features
- **Feature Encoding** - Label encoding for categorical variables
- **Feature Scaling** - StandardScaler for numerical normalization

### 2. Model Training
- **Algorithm**: Random Forest Classifier
- **Parameters**: 100 estimators, max depth 10, min samples split 5
- **Validation**: 80/20 train-test split with stratification
- **Performance**: 98.2% accuracy on test data

### 3. Model Evaluation
- **Accuracy Score** - Overall prediction accuracy
- **Classification Report** - Precision, recall, F1-score
- **Confusion Matrix** - True vs predicted classifications

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| **Model Accuracy** | 98.2% |
| **Dataset Size** | 15,000 records |
| **Features Used** | 9 key features |
| **Training Time** | ~2 minutes |
| **Prediction Time** | <1 second |
| **File Upload Limit** | 50MB |

## 🔒 Security Features

- **Password Hashing** - Bcrypt encryption for user passwords
- **Session Management** - Secure user session handling
- **File Validation** - CSV format and size validation
- **Input Sanitization** - Protection against malicious inputs
- **CSRF Protection** - Form security measures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dharaneesh**
- GitHub: [@Dharaneesh20](https://github.com/Dharaneesh20)
- Repository: [Employee-Retention-Analaysis](https://github.com/Dharaneesh20/Employee-Retention-Analaysis)

## 🙏 Acknowledgments

- Dataset sourced from Kaggle HR Analytics
- UI/UX inspiration from modern dashboard designs
- ML algorithms implemented using scikit-learn
- Web framework powered by Flask

## 📞 Support

If you have any questions or need support, please:
1. Check the [Issues](https://github.com/Dharaneesh20/Employee-Retention-Analaysis/issues) page
2. Create a new issue with detailed description
3. Contact the repository owner

---

<div align="center">
  <p>⭐ If you found this project helpful, please give it a star! ⭐</p>
  <p>Built with ❤️ by Dharaneesh</p>
</div>

---

**Built with ❤️ for HR professionals and data scientists**


