// Employee Retention Prediction System - Main JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize form validations
    initializeFormValidations();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize progress bars
    initializeProgressBars();
});

// Initialize Bootstrap tooltips
function initializeTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation enhancements
function initializeFormValidations() {
    // Real-time validation for number inputs
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function() {
            validateNumberInput(this);
        });
    });
    
    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function() {
            validateEmail(this);
        });
    });
    
    // Password strength validation
    document.querySelectorAll('input[type="password"]').forEach(input => {
        if (input.name === 'password') {
            input.addEventListener('input', function() {
                validatePasswordStrength(this);
            });
        }
    });
}

// Validate number inputs
function validateNumberInput(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    
    let isValid = true;
    let message = '';
    
    if (isNaN(value)) {
        isValid = false;
        message = 'Please enter a valid number';
    } else if (min !== undefined && value < min) {
        isValid = false;
        message = `Value must be at least ${min}`;
    } else if (max !== undefined && value > max) {
        isValid = false;
        message = `Value must be at most ${max}`;
    }
    
    updateInputValidation(input, isValid, message);
}

// Validate email format
function validateEmail(input) {
    const email = input.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    const message = isValid ? 'Valid email address' : 'Please enter a valid email address';
    
    updateInputValidation(input, isValid, message);
}

// Validate password strength
function validatePasswordStrength(input) {
    const password = input.value;
    const minLength = 6;
    
    let strength = 0;
    let message = '';
    let isValid = false;
    
    if (password.length >= minLength) {
        strength += 1;
        isValid = true;
    }
    
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    
    if (password.length < minLength) {
        message = `Password must be at least ${minLength} characters`;
        isValid = false;
    } else if (strength < 2) {
        message = 'Weak password';
    } else if (strength < 4) {
        message = 'Medium strength password';
    } else {
        message = 'Strong password';
    }
    
    updateInputValidation(input, isValid, message);
    
    // Update password strength indicator if it exists
    const strengthIndicator = input.parentNode.querySelector('.password-strength');
    if (strengthIndicator) {
        strengthIndicator.className = `password-strength strength-${Math.min(strength, 4)}`;
        strengthIndicator.textContent = message;
    }
}

// Update input validation UI
function updateInputValidation(input, isValid, message) {
    // Remove existing validation classes
    input.classList.remove('is-valid', 'is-invalid');
    
    // Remove existing feedback
    const existingFeedback = input.parentNode.querySelector('.invalid-feedback, .valid-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    if (input.value.trim() !== '') {
        // Add validation class
        input.classList.add(isValid ? 'is-valid' : 'is-invalid');
        
        // Add feedback message
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = isValid ? 'valid-feedback' : 'invalid-feedback';
        feedbackDiv.textContent = message;
        input.parentNode.appendChild(feedbackDiv);
    }
}

// Initialize animations
function initializeAnimations() {
    // Fade in animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize progress bars
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width') || bar.style.width;
        if (targetWidth) {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500);
        }
    });
}

// Utility functions
class Utils {
    // Show loading state
    static showLoading(element, text = 'Loading...') {
        element.disabled = true;
        const originalContent = element.innerHTML;
        element.setAttribute('data-original-content', originalContent);
        element.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
        return originalContent;
    }
    
    // Hide loading state
    static hideLoading(element) {
        element.disabled = false;
        const originalContent = element.getAttribute('data-original-content');
        if (originalContent) {
            element.innerHTML = originalContent;
            element.removeAttribute('data-original-content');
        }
    }
    
    // Show toast notification
    static showToast(message, type = 'info', duration = 5000) {
        const toastContainer = this.getOrCreateToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        const bsToast = new bootstrap.Toast(toast, {
            autohide: true,
            delay: duration
        });
        
        bsToast.show();
        
        // Remove toast element after it's hidden
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }
    
    // Get or create toast container
    static getOrCreateToastContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '1055';
            document.body.appendChild(container);
        }
        return container;
    }
    
    // Format file size
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Debounce function
    static debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }
    
    // Generate random ID
    static generateId(prefix = 'id') {
        return prefix + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Validate file type
    static validateFileType(file, allowedTypes) {
        return allowedTypes.some(type => {
            if (type.startsWith('.')) {
                return file.name.toLowerCase().endsWith(type.toLowerCase());
            } else {
                return file.type.toLowerCase().includes(type.toLowerCase());
            }
        });
    }
    
    // Copy text to clipboard
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Copied to clipboard!', 'success', 2000);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.showToast('Failed to copy text', 'danger', 2000);
            return false;
        }
    }
}

// Chart utilities for data visualization
class ChartUtils {
    // Create a simple bar chart using Canvas
    static createBarChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Default options
        const defaultOptions = {
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1,
            padding: 40,
            showLabels: true,
            showValues: true
        };
        
        const opts = { ...defaultOptions, ...options };
        const padding = opts.padding;
        
        // Calculate chart area
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        // Find max value for scaling
        const maxValue = Math.max(...data.map(item => item.value));
        
        // Calculate bar width
        const barWidth = chartWidth / data.length * 0.8;
        const barSpacing = chartWidth / data.length * 0.2;
        
        // Draw bars
        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = padding + (index * (barWidth + barSpacing)) + (barSpacing / 2);
            const y = height - padding - barHeight;
            
            // Draw bar
            ctx.fillStyle = opts.backgroundColor;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw border
            if (opts.borderWidth > 0) {
                ctx.strokeStyle = opts.borderColor;
                ctx.lineWidth = opts.borderWidth;
                ctx.strokeRect(x, y, barWidth, barHeight);
            }
            
            // Draw label
            if (opts.showLabels) {
                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(item.label, x + barWidth / 2, height - padding + 15);
            }
            
            // Draw value
            if (opts.showValues) {
                ctx.fillStyle = '#333';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);
            }
        });
    }
    
    // Create a simple pie chart
    static createPieChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Default options
        const defaultOptions = {
            colors: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8'],
            showLabels: true,
            showValues: true
        };
        
        const opts = { ...defaultOptions, ...options };
        
        // Calculate center and radius
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;
        
        // Calculate total value
        const total = data.reduce((sum, item) => sum + item.value, 0);
        
        // Draw pie slices
        let currentAngle = -Math.PI / 2; // Start from top
        
        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            
            // Draw slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            
            ctx.fillStyle = opts.colors[index % opts.colors.length];
            ctx.fill();
            
            // Draw border
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw label
            if (opts.showLabels) {
                const labelAngle = currentAngle + sliceAngle / 2;
                const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
                const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
                
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(item.label, labelX, labelY);
                
                if (opts.showValues) {
                    const percentage = ((item.value / total) * 100).toFixed(1);
                    ctx.fillText(`${percentage}%`, labelX, labelY + 15);
                }
            }
            
            currentAngle += sliceAngle;
        });
    }
}

// Export utilities for use in other scripts
window.Utils = Utils;
window.ChartUtils = ChartUtils;

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You can add error reporting here
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You can add error reporting here
});

// Page visibility change handler
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page became visible - you can refresh data here
        console.log('Page became visible');
    } else {
        // Page became hidden - you can pause timers here
        console.log('Page became hidden');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + / to show keyboard shortcuts
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        showKeyboardShortcuts();
    }
});

function showKeyboardShortcuts() {
    const shortcuts = [
        { keys: 'Ctrl + /', description: 'Show keyboard shortcuts' },
        { keys: 'Esc', description: 'Close modals and dropdowns' },
        { keys: 'Tab', description: 'Navigate between form fields' },
        { keys: 'Enter', description: 'Submit forms' }
    ];
    
    let shortcutText = 'Keyboard Shortcuts:\n\n';
    shortcuts.forEach(shortcut => {
        shortcutText += `${shortcut.keys}: ${shortcut.description}\n`;
    });
    
    Utils.showToast(shortcutText.replace(/\n/g, '<br>'), 'info', 8000);
}