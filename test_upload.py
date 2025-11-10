import requests
import sys
import os

# Test file upload functionality
def test_upload():
    # First, let's test if the server is running
    try:
        response = requests.get('http://localhost:5000')
        print(f"Server status: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Server is not running. Please start the Flask app with 'python app.py'")
        return
    
    # Test the upload endpoint
    upload_url = 'http://localhost:5000/upload_data'
    
    # Check if the sample file exists
    sample_file = 'Sample Test Data/HR_comma_sep.csv'
    if not os.path.exists(sample_file):
        print(f"❌ Sample file not found: {sample_file}")
        return
    
    print(f"✅ Found sample file: {sample_file}")
    print(f"File size: {os.path.getsize(sample_file)} bytes")
    
    # Try to access the upload page first
    try:
        response = requests.get(upload_url)
        print(f"Upload page status: {response.status_code}")
        
        if response.status_code == 302:
            print("❌ Redirected - probably need to login first")
            return
        elif response.status_code != 200:
            print("❌ Upload page not accessible")
            return
        
        print("✅ Upload page is accessible")
        
    except Exception as e:
        print(f"❌ Error accessing upload page: {e}")

if __name__ == '__main__':
    test_upload()