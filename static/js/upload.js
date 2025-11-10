// File Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('file');
    const uploadForm = document.getElementById('uploadForm');
    
    if (uploadArea && fileInput) {
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFileSelection(files[0]);
            }
        });
        
        // Click to select file
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        // File input change
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleFileSelection(e.target.files[0]);
            }
        });
    }
    
    // Handle file selection
    function handleFileSelection(file) {
        console.log('File selected:', file.name, file.size, file.type);
        
        // Validate file type
        if (!file.name.toLowerCase().endsWith('.csv')) {
            alert('Please select a CSV file');
            return;
        }
        
        // Validate file size (50MB max)
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size must be less than 50MB');
            return;
        }
        
        // Update UI to show selected file
        const uploadContent = uploadArea.querySelector('.upload-content');
        if (uploadContent) {
            uploadContent.innerHTML = `
                <i class="fas fa-file-csv fa-3x text-success mb-3"></i>
                <h5 class="text-success">File Selected</h5>
                <p class="text-muted">${file.name}</p>
                <p class="text-muted">Size: ${formatFileSize(file.size)}</p>
                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="clearFileSelection()">
                    <i class="fas fa-times"></i> Change File
                </button>
            `;
        }
    }
    
    // Clear file selection
    window.clearFileSelection = function() {
        fileInput.value = '';
        const uploadContent = uploadArea.querySelector('.upload-content');
        if (uploadContent) {
            uploadContent.innerHTML = `
                <i class="fas fa-cloud-upload-alt fa-4x text-primary mb-3"></i>
                <h5>Drag & Drop CSV File Here</h5>
                <p class="text-muted">or click to browse files</p>
            `;
        }
    };
    
    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Form submission
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            const fileInput = document.getElementById('file');
            console.log('Form submitted, file input:', fileInput);
            console.log('Files:', fileInput.files);
            
            if (!fileInput.files || fileInput.files.length === 0) {
                e.preventDefault();
                alert('Please select a file to upload');
                return false;
            }
            
            const file = fileInput.files[0];
            console.log('Submitting file:', file.name, file.size);
            
            // Show loading state
            const submitBtn = uploadForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
                submitBtn.disabled = true;
            }
            
            // Show progress bar if it exists
            const progressDiv = document.getElementById('uploadProgress');
            if (progressDiv) {
                progressDiv.style.display = 'block';
            }
        });
    }
});