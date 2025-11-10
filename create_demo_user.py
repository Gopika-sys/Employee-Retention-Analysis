#!/usr/bin/env python3
"""
Create demo user for Employee Retention Prediction System
"""

from app import app, db, User, bcrypt

def create_demo_user():
    """Create a demo user for testing"""
    with app.app_context():
        # Check if demo user already exists
        existing_user = User.query.filter_by(username='demo').first()
        if existing_user:
            print("Demo user already exists!")
            return
        
        # Create demo user
        hashed_password = bcrypt.generate_password_hash('demo123').decode('utf-8')
        demo_user = User(
            username='demo',
            email='demo@example.com',
            password=hashed_password,
            role='user'
        )
        
        db.session.add(demo_user)
        db.session.commit()
        
        print("✅ Demo user created successfully!")
        print("Username: demo")
        print("Password: demo123")
        print("Email: demo@example.com")

if __name__ == "__main__":
    create_demo_user()