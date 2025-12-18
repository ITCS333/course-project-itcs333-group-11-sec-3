// Global state to track login
        let currentUser = null;
        
        // Function to update all navigation based on login state
        function updateNavigation() {
            const homepageUserInfo = document.getElementById('homepage-user-info');
            const homepageLoginLink = document.querySelector('#homepage .nav-link[href="#login-page"]');
            const homepageDashboardLink = document.getElementById('homepage-dashboard-link');
            const quickAccessSection = document.getElementById('quick-access-grid');
            
            if (currentUser) {
                // User is logged in
                homepageUserInfo.innerHTML = `
                    <span>Welcome, <strong>${currentUser.name}</strong></span>
                    <span class="badge ${currentUser.role === 'admin' ? 'badge-admin' : 'badge-student'}">${currentUser.role === 'admin' ? 'Admin' : 'Student'}</span>
                `;
                
                // Update homepage login link to logout
                homepageLoginLink.textContent = 'Logout';
                homepageLoginLink.classList.add('logout-link');
                
                // Show dashboard link in homepage navigation
                homepageDashboardLink.style.display = 'block';
                const dashboardLink = homepageDashboardLink.querySelector('.dashboard-link');
                dashboardLink.textContent = currentUser.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard';
                dashboardLink.href = currentUser.role === 'admin' ? '#admin-portal' : '#student-view';
                
                // Update quick access section - ONLY dashboard and syllabus
                quickAccessSection.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h3>${currentUser.role === 'admin' ? 'Admin' : 'Student'} Dashboard</h3>
                            <p>Access your ${currentUser.role === 'admin' ? 'admin dashboard' : 'student dashboard'} to manage course content.</p>
                            <a href="#${currentUser.role === 'admin' ? 'admin-portal' : 'student-view'}" class="btn btn-primary go-to-portal-btn">Go to ${currentUser.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}</a>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <h3>Course Syllabus</h3>
                            <p>Download the complete course syllabus and schedule.</p>
                            <button class="btn btn-outline">Download PDF</button>
                        </div>
                    </div>
                `;
                
                // Add event listener for the new portal button
                document.querySelector('.go-to-portal-btn')?.addEventListener('click', function(e) {
                    e.preventDefault();
                    showDashboard(currentUser.role);
                });
            } else {
                // User is not logged in
                homepageUserInfo.innerHTML = `<span>Not logged in</span>`;
                
                // Update homepage login link
                homepageLoginLink.textContent = 'Login';
                homepageLoginLink.classList.remove('logout-link');
                
                // Hide dashboard link in homepage navigation
                homepageDashboardLink.style.display = 'none';
                
                // Reset quick access section to default (with login options)
                quickAccessSection.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h3>Student Login</h3>
                            <p>Access course materials, assignments, and discussion boards.</p>
                            <a href="#login-page" class="btn btn-primary student-login-btn">Student Login</a>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <h3>Admin Portal</h3>
                            <p>Manage users, course settings, and student information.</p>
                            <a href="#login-page" class="btn btn-secondary admin-login-btn">Admin Login</a>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <h3>Course Syllabus</h3>
                            <p>Download the complete course syllabus and schedule.</p>
                            <button class="btn btn-outline">Download PDF</button>
                        </div>
                    </div>
                `;
                
                // Re-add event listeners for login buttons
                setupLoginButtons();
            }
        }
        
        // Function to show appropriate dashboard based on role
        function showDashboard(role) {
            // Hide all pages
            document.getElementById('homepage').style.display = 'none';
            document.getElementById('login-page').style.display = 'none';
            document.getElementById('admin-portal').style.display = 'none';
            document.getElementById('student-view').style.display = 'none';
            
            // Show appropriate dashboard
            if (role === 'admin') {
                document.getElementById('admin-portal').style.display = 'block';
                // Update active nav link
                document.querySelectorAll('.nav-link[href^="#"]').forEach(l => l.classList.remove('active'));
                document.querySelector('#admin-portal .nav-link[href="#admin-portal"]').classList.add('active');
            } else {
                document.getElementById('student-view').style.display = 'block';
                // Update active nav link
                document.querySelectorAll('.nav-link[href^="#"]').forEach(l => l.classList.remove('active'));
                document.querySelector('#student-view .nav-link[href="#student-view"]').classList.add('active');
            }
        }
        
        // Function to logout
        function logout() {
            currentUser = null;
            updateNavigation();
            
            // Hide all pages
            document.getElementById('homepage').style.display = 'none';
            document.getElementById('login-page').style.display = 'none';
            document.getElementById('admin-portal').style.display = 'none';
            document.getElementById('student-view').style.display = 'none';
            
            // Show homepage
            document.getElementById('homepage').style.display = 'block';
            
            // Update navigation
            document.querySelectorAll('.nav-link[href^="#"]').forEach(l => l.classList.remove('active'));
            document.querySelector('#homepage .nav-link[href="#homepage"]').classList.add('active');
        }
        
        // Setup login buttons event listeners
        function setupLoginButtons() {
            // Student login button
            document.querySelector('.student-login-btn')?.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('homepage').style.display = 'none';
                document.getElementById('login-page').style.display = 'block';
                document.getElementById('admin-portal').style.display = 'none';
                document.getElementById('student-view').style.display = 'none';
                
                document.querySelectorAll('.nav-link[href^="#"]').forEach(l => l.classList.remove('active'));
                document.querySelector('#login-page .nav-link[href="#login-page"]').classList.add('active');
            });
            
            // Admin login button
            document.querySelector('.admin-login-btn')?.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('homepage').style.display = 'none';
                document.getElementById('login-page').style.display = 'block';
                document.getElementById('admin-portal').style.display = 'none';
                document.getElementById('student-view').style.display = 'none';
                
                document.querySelectorAll('.nav-link[href^="#"]').forEach(l => l.classList.remove('active'));
                document.querySelector('#login-page .nav-link[href="#login-page"]').classList.add('active');
            });
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            // Navigation functionality - only for links with href
            const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    
                    // Handle logout links
                    if (this.classList.contains('logout-link')) {
                        logout();
                        return;
                    }
                    
                    // Handle dashboard links in homepage
                    if (this.classList.contains('dashboard-link') && currentUser) {
                        showDashboard(currentUser.role);
                        return;
                    }
                    
                    // If clicking on login while already logged in, go to appropriate dashboard
                    if (targetId === '#login-page' && currentUser) {
                        showDashboard(currentUser.role);
                        return;
                    }
                    
                    // Hide all pages
                    document.getElementById('homepage').style.display = 'none';
                    document.getElementById('login-page').style.display = 'none';
                    document.getElementById('admin-portal').style.display = 'none';
                    document.getElementById('student-view').style.display = 'none';
                    
                    // Show target page
                    document.querySelector(targetId).style.display = 'block';
                    
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Handle homepage login access button
            document.querySelector('.login-access-btn')?.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('homepage').style.display = 'none';
                document.getElementById('login-page').style.display = 'block';
                document.getElementById('admin-portal').style.display = 'none';
                document.getElementById('student-view').style.display = 'none';
                
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelector('#login-page .nav-link[href="#login-page"]').classList.add('active');
            });
            
            // Handle cancel button in login page
            document.getElementById('cancel-login-btn')?.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('homepage').style.display = 'block';
                document.getElementById('login-page').style.display = 'none';
                document.getElementById('admin-portal').style.display = 'none';
                document.getElementById('student-view').style.display = 'none';
                
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelector('#homepage .nav-link[href="#homepage"]').classList.add('active');
            });
            
            // Handle return to homepage button in student view
            document.querySelector('.return-home-btn')?.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('homepage').style.display = 'block';
                document.getElementById('login-page').style.display = 'none';
                document.getElementById('admin-portal').style.display = 'none';
                document.getElementById('student-view').style.display = 'none';
                
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelector('#homepage .nav-link[href="#homepage"]').classList.add('active');
            });
            
            // Form submissions (demo only)
            document.getElementById('login-form')?.addEventListener('submit', function(e) {
                e.preventDefault();
                const isAdmin = document.getElementById('role').checked;
                
                if (isAdmin) {
                    // Simulate admin login
                    currentUser = {
                        name: 'MR Abdullah Subah',
                        role: 'admin'
                    };
                } else {
                    // Simulate student login (default to first student: Ahmed Mohammed)
                    currentUser = {
                        name: 'Ahmed Mohammed',
                        role: 'student'
                    };
                }
                
                // Update navigation
                updateNavigation();
                
                // Show appropriate dashboard
                showDashboard(currentUser.role);
            });
            
            // Admin form submissions (demo)
            document.getElementById('change-password-form')?.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Password change functionality will be implemented in Phase 3 (PHP/MySQL).');
                this.reset();
            });
            
            document.getElementById('add-student-form')?.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Add student functionality will be implemented in Phase 3.');
                this.reset();
            });
            
            // Edit student functionality
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const studentId = row.cells[0].textContent;
                    const studentName = row.cells[1].textContent;
                    const studentEmail = row.cells[2].textContent;
                    
                    document.getElementById('edit-student-id').value = studentId;
                    document.getElementById('edit-student-name').value = studentName;
                    document.getElementById('edit-student-email').value = studentEmail;
                    
                    document.getElementById('edit-student-modal').showModal();
                });
            });
            
            document.getElementById('edit-student-form')?.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Edit student functionality will be implemented in Phase 3.');
                document.getElementById('edit-student-modal').close();
            });
            
            // Delete student functionality
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const studentId = row.cells[0].textContent;
                    const studentName = row.cells[1].textContent;
                    
                    document.getElementById('delete-student-name').textContent = studentName;
                    document.getElementById('delete-student-id').textContent = studentId;
                    
                    document.getElementById('delete-student-modal').showModal();
                });
            });
            
            document.getElementById('confirm-delete-btn')?.addEventListener('click', function() {
                alert('Delete student functionality will be implemented in Phase 3.');
                document.getElementById('delete-student-modal').close();
            });
            
            // Setup initial login buttons
            setupLoginButtons();
            
            // Auto-show homepage on load
            document.getElementById('homepage').style.display = 'block';
        });