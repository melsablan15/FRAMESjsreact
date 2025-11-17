import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './FacultyDashboard.css';
import LoggedInHeader from '../ZCommon/LoggedInHeader'; // <-- IMPORT UNIVERSAL HEADER

// --- PLACEHOLDERS (UPDATE THESE PATHS) ---
const FACULTY_AVATAR = '/path/to/faculty-avatar.png';

// --- THEME & USER DEFINITION ---
const facultyTheme = {
    primary: '#A62525', // Primary Red
    dark: '#c82333',
    lightBg: 'rgba(255, 255, 255, 0.15)',
    text: '#FFFFFF'
};

const facultyUser = {
    name: 'Dr. Sarah Johnson',
    avatar: FACULTY_AVATAR,
    notifications: 2
};

// ===========================================
// 1. Faculty Sidebar Component
// ===========================================
const FacultySidebar = ({ activeView, setActiveView }) => {
    const navItems = [
        { name: 'Dashboard', icon: 'fas fa-th-large', view: 'dashboard' },
        { name: 'My Classes', icon: 'fas fa-book-reader', view: 'classes' },
        { name: 'Attendance', icon: 'fas fa-user-check', view: 'attendance' },
        { name: 'Reports', icon: 'fas fa-chart-bar', view: 'reports', notification: 2 },
        { name: 'Profile', icon: 'fas fa-user-circle', view: 'profile' },
    ];

    return (
        <aside className="faculty-sidebar">
            <div className="faculty-sidebar-toggle">
                <i className="fas fa-bars"></i>
            </div>
            <div className="faculty-role-tag">
                Faculty Member
            </div>
            <nav className="faculty-nav">
                <ul>
                    {navItems.map((item) => (
                        <li 
                          key={item.name} 
                          className={activeView === item.view ? 'active' : ''}
                          onClick={() => setActiveView(item.view)}
                        >
                            <a href="#">
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                                {item.notification && <span className="notification-badge">{item.notification}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">
                SmartCampus v2.1.0
            </div>
        </aside>
    );
};

// ===========================================
// 2. All REAL Faculty Components (Restored)
// ===========================================

// --- Faculty Dashboard View ---
const FacultyDashboardView = () => (
    <div className="faculty-content-grid">
        <FacultySummaryCards />
        <TodaySchedule />
        <RecentAttendance />
        <ClassroomAlerts />
    </div>
);

const FacultySummaryCard = ({ iconClass, title, value, subValue, subValueColor, iconBgClass }) => (
    <div className="card summary-card">
        <div className={`summary-icon-container ${iconBgClass}`}>
            <i className={iconClass}></i>
        </div>
        <div className="summary-content">
            <div className="summary-title">{title}</div>
            <div className="summary-value">{value}</div>
            {subValue && (
                <div className="summary-sub-value" style={{ color: subValueColor }}>
                    {subValue}
                </div>
            )}
        </div>
    </div>
);

const FacultySummaryCards = () => (
    <div className="summary-cards-container">
        <FacultySummaryCard iconClass="fas fa-calendar-day" title="Today's Classes" value="5" subValue="2 upcoming" subValueColor="#1a73e8" iconBgClass="f-classes-bg" />
        <FacultySummaryCard iconClass="fas fa-user-check" title="Attendance Rate" value="87%" subValue="+3% vs last week" subValueColor="#28a745" iconBgClass="f-attendance-bg" />
        <FacultySummaryCard iconClass="fas fa-users" title="Total Students" value="156" subValue="Across 3 courses" subValueColor="#555" iconBgClass="f-students-bg" />
        <FacultySummaryCard iconClass="fas fa-bell" title="Pending Alerts" value="2" subValue="Requires attention" subValueColor="#dc3545" iconBgClass="f-alerts-bg" />
    </div>
);

const ScheduleItem = ({ time, title, details, showMonitor }) => (
    <div className="schedule-item">
        <div className="schedule-time-dot">
            <span className="dot"></span>
            <span className="time">{time}</span>
        </div>
        <div className="schedule-details">
            <span className="schedule-title">{title}</span>
            <span className="schedule-meta">{details}</span>
        </div>
        <div className="schedule-actions">
            <button className="schedule-button view-button">
                <i className="fas fa-eye"></i> View
            </button>
            {showMonitor && (
                <button className="schedule-button monitor-button">
                    <i className="fas fa-video"></i> Monitor
                </button>
            )}
        </div>
    </div>
);

const TodaySchedule = () => (
    <div className="card today-schedule">
        <h3>Today's Schedule</h3>
        <div className="schedule-list">
            <ScheduleItem time="09:00 - 10:30" title="Computer Science 101" details="Room A-205 • 32 students" showMonitor={false} />
            <ScheduleItem time="11:00 - 12:30" title="Data Structures" details="Room B-301 • 28 students" showMonitor={false} />
            <ScheduleItem time="02:00 - 03:30" title="Algorithms" details="Room A-205 • 25 students" showMonitor={true} />
            <ScheduleItem time="04:00 - 05:30" title="Software Engineering" details="Lab C-102 • 30 students" showMonitor={true} />
        </div>
    </div>
);

const AttendanceItem = ({ title, time, ratio, percent, percentColor }) => (
    <div className="attendance-item">
        <div className="attendance-details">
            <span className="attendance-title">{title}</span>
            <span className="attendance-time">{time}</span>
        </div>
        <div className="attendance-stats">
            <span className="attendance-ratio">{ratio}</span>
            <span className="attendance-percent" style={{ color: percentColor }}>{percent}</span>
        </div>
    </div>
);

const RecentAttendance = () => (
    <div className="card recent-attendance">
        <h3>Recent Attendance</h3>
        <AttendanceItem title="Computer Science 101" time="Today, 9:00 AM" ratio="30/32" percent="94%" percentColor="#28a745" />
        <AttendanceItem title="Data Structures" time="Yesterday, 11:00 AM" ratio="26/28" percent="93%" percentColor="#28a745" />
        <AttendanceItem title="Algorithms" time="Yesterday, 2:00 PM" ratio="22/25" percent="88%" percentColor="#ffc107" />
    </div>
);

const ClassroomAlerts = () => (
    <div className="card classroom-alerts">
        <h3>Classroom Alerts</h3>
        <div className="alert-item">
            <span className="alert-type yellow"></span>
            <div className="alert-details">
                <div className="alert-description"><strong>High occupancy in Room A-205</strong></div>
                <div className="alert-time">15 min ago</div>
            </div>
        </div>
        <div className="alert-item">
            <span className="alert-type blue"></span>
            <div className="alert-details">
                <div className="alert-description"><strong>New student registered for CS 101</strong></div>
                <div className="alert-time">1 hour ago</div>
            </div>
        </div>
        <div className="alert-item">
            <span className="alert-type green"></span>
            <div className="alert-details">
                <div className="alert-description"><strong>Perfect attendance recorded</strong></div>
                <div className="alert-time">2 hours ago</div>
            </div>
        </div>
    </div>
);

//  MyClasses component :

const MyClasses = () => (
    <div className="my-classes-container">
        <h2>My Classes</h2>
        <div className="classes-grid-enhanced">
            {/* Class Card 1 */}
            <div className="class-card-enhanced">
                <div className="class-card-header">
                    <h3>Computer Science 101</h3>
                    <button className="class-options-btn">
                        <i className="fas fa-ellipsis-v"></i>
                    </button>
                </div>
                <div className="class-code">CS101</div>
                
                <div className="class-details">
                    <div className="class-detail-item">
                        <i className="fas fa-users"></i>
                        <span>32 students enrolled</span>
                    </div>
                    <div className="class-detail-item">
                        <i className="fas fa-calendar-alt"></i>
                        <span>Mon, Wed, Fri - 9:00 AM</span>
                    </div>
                    <div className="class-detail-item">
                        <i className="fas fa-door-open"></i>
                        <span>Room A-205</span>
                    </div>
                </div>

                <div className="class-attendance-summary">
                    <div className="attendance-label">Avg. Attendance</div>
                    <div className="attendance-percentage green">94%</div>
                </div>

                <button className="take-attendance-btn">
                    <i className="fas fa-user-check"></i> Take Attendance
                </button>
            </div>

            {/* Class Card 2 */}
            <div className="class-card-enhanced">
                <div className="class-card-header">
                    <h3>Data Structures</h3>
                    <button className="class-options-btn">
                        <i className="fas fa-ellipsis-v"></i>
                    </button>
                </div>
                <div className="class-code">CS201</div>
                
                <div className="class-details">
                    <div className="class-detail-item">
                        <i className="fas fa-users"></i>
                        <span>28 students enrolled</span>
                    </div>
                    <div className="class-detail-item">
                        <i className="fas fa-calendar-alt"></i>
                        <span>Tue, Thu - 11:00 AM</span>
                    </div>
                    <div className="class-detail-item">
                        <i className="fas fa-door-open"></i>
                        <span>Room B-301</span>
                    </div>
                </div>

                <div className="class-attendance-summary">
                    <div className="attendance-label">Avg. Attendance</div>
                    <div className="attendance-percentage orange">89%</div>
                </div>

                <button className="take-attendance-btn">
                    <i className="fas fa-user-check"></i> Take Attendance
                </button>
            </div>

            {/* Class Card 3 */}
            <div className="class-card-enhanced">
                <div className="class-card-header">
                    <h3>Algorithms</h3>
                    <button className="class-options-btn">
                        <i className="fas fa-ellipsis-v"></i>
                    </button>
                </div>
                <div className="class-code">CS301</div>
                
                <div className="class-details">
                    <div className="class-detail-item">
                        <i className="fas fa-users"></i>
                        <span>25 students enrolled</span>
                    </div>
                    <div className="class-detail-item">
                        <i className="fas fa-calendar-alt"></i>
                        <span>Mon, Wed - 2:00 PM</span>
                    </div>
                    <div className="class-detail-item">
                        <i className="fas fa-door-open"></i>
                        <span>Room A-205</span>
                    </div>
                </div>

                <div className="class-attendance-summary">
                    <div className="attendance-label">Avg. Attendance</div>
                    <div className="attendance-percentage green">91%</div>
                </div>

                <button className="take-attendance-btn">
                    <i className="fas fa-user-check"></i> Take Attendance
                </button>
            </div>

            {/* Class Card 4 */}
            <div className="class-card-enhanced">
                <div className="class-card-header">
                    <h3>Software Engineering</h3>
                    <button className="class-options-btn">
                        <i className="fas fa-ellipsis-v"></i>
                    </button>
                </div>
                <div className="class-code">CS401</div>
                
                <div className="class-details">
                    <div className="class-detail-item">
                        <i className="fas fa-users"></i>
                        <span>30 students enrolled</span>
                    </div>
                    <div className="class-detail-item">
                        <i className="fas fa-calendar-alt"></i>
                        <span>Tue, Thu - 4:00 PM</span>
                    </div>
                    <div className="class-detail-item">
                        <i className="fas fa-door-open"></i>
                        <span>Lab C-102</span>
                    </div>
                </div>

                <div className="class-attendance-summary">
                    <div className="attendance-label">Avg. Attendance</div>
                    <div className="attendance-percentage green">92%</div>
                </div>

                <button className="take-attendance-btn">
                    <i className="fas fa-user-check"></i> Take Attendance
                </button>
            </div>
        </div>
    </div>
);

// --- Attendance View ---

const Attendance = () => (
    <div className="attendance-management">
        {/* Top Stats */}
        <div className="attendance-header">
            <h2>Attendance Management</h2>
            <div className="attendance-actions">
                <button className="schedule-button view-button">
                    <i className="fas fa-file-export"></i> Export Report
                </button>
                <button className="schedule-button monitor-button">
                    <i className="fas fa-user-check"></i> Take Attendance
                </button>
            </div>
        </div>

        {/* Statistics Cards */}
        <div className="attendance-stats-grid">
            <div className="attendance-stat-card">
                <div className="stat-label">Today</div>
                <div className="stat-value green">94%</div>
                <div className="stat-sub">Yesterday</div>
            </div>
            <div className="attendance-stat-card">
                <div className="stat-label">Total Classes</div>
                <div className="stat-value">156</div>
                <div className="stat-sub">This Semester</div>
            </div>
            <div className="attendance-stat-card">
                <div className="stat-label">Absent Today</div>
                <div className="stat-value red">12</div>
                <div className="stat-sub">Students</div>
            </div>
            <div className="attendance-stat-card">
                <div className="stat-label">Alerts</div>
                <div className="stat-value orange">8</div>
                <div className="stat-sub">Low Attendance</div>
            </div>
            <div className="attendance-stat-card">
                <div className="stat-label">Unread Alerts</div>
                <div className="stat-value">4</div>
                <div className="stat-sub">Pending</div>
            </div>
        </div>

        {/* Today's Classes */}
        <div className="card">
            <h3>Today's Classes</h3>
            <div className="today-classes-list">
                <div className="today-class-item">
                    <div className="class-info">
                        <h4>Computer Science 101</h4>
                        <p>09:00 - 10:30 • Room A-205</p>
                    </div>
                    <div className="class-attendance-rate">95%</div>
                    <div className="attendance-progress">
                        <div className="progress-bar" style={{width: '95%'}}></div>
                    </div>
                    <div className="class-actions">
                        <button className="action-btn">
                            <i className="fas fa-eye"></i> View Details
                        </button>
                        <button className="action-btn">
                            <i className="fas fa-edit"></i> Edit
                        </button>
                        <button className="action-btn">
                            <i className="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>

                <div className="today-class-item">
                    <div className="class-info">
                        <h4>Data Structures</h4>
                        <p>11:00 - 12:30 • Room B-301</p>
                    </div>
                    <div className="class-attendance-rate">90%</div>
                    <div className="attendance-progress">
                        <div className="progress-bar" style={{width: '90%'}}></div>
                    </div>
                    <div className="class-actions">
                        <button className="action-btn">
                            <i className="fas fa-eye"></i> View Details
                        </button>
                        <button className="action-btn">
                            <i className="fas fa-edit"></i> Edit
                        </button>
                        <button className="action-btn">
                            <i className="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>

                <div className="today-class-item upcoming">
                    <div className="class-info">
                        <h4>Algorithms</h4>
                        <p>02:00 - 03:30 • Room A-205</p>
                    </div>
                    <button className="take-attendance-btn">
                        <i className="fas fa-user-check"></i> Take Attendance
                    </button>
                </div>

                <div className="today-class-item upcoming">
                    <div className="class-info">
                        <h4>Software Engineering</h4>
                        <p>04:00 - 05:30 • Lab C-102</p>
                    </div>
                    <button className="take-attendance-btn">
                        <i className="fas fa-user-check"></i> Take Attendance
                    </button>
                </div>
            </div>
        </div>

        {/* Recent Attendance History Table */}
        <div className="card">
            <h3>Recent Attendance History</h3>
            <div className="attendance-table-wrapper">
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Classes</th>
                            <th>Time</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Today</td>
                            <td>Computer Science 101</td>
                            <td>09:00 AM</td>
                            <td>30</td>
                            <td>2</td>
                            <td><span className="rate-badge green">94%</span></td>
                            <td><button className="icon-btn"><i className="fas fa-chevron-right"></i></button></td>
                        </tr>
                        <tr>
                            <td>Nov 13</td>
                            <td>Data Structures</td>
                            <td>11:00 AM</td>
                            <td>26</td>
                            <td>2</td>
                            <td><span className="rate-badge green">93%</span></td>
                            <td><button className="icon-btn"><i className="fas fa-chevron-right"></i></button></td>
                        </tr>
                        <tr>
                            <td>Nov 13</td>
                            <td>Computer Science 101</td>
                            <td>02:00 PM</td>
                            <td>29</td>
                            <td>3</td>
                            <td><span className="rate-badge green">91%</span></td>
                            <td><button className="icon-btn"><i className="fas fa-chevron-right"></i></button></td>
                        </tr>
                        <tr>
                            <td>Nov 12</td>
                            <td>Algorithms</td>
                            <td>02:00 PM</td>
                            <td>22</td>
                            <td>3</td>
                            <td><span className="rate-badge orange">88%</span></td>
                            <td><button className="icon-btn"><i className="fas fa-chevron-right"></i></button></td>
                        </tr>
                        <tr>
                            <td>Nov 12</td>
                            <td>Software Engineering</td>
                            <td>04:00 PM</td>
                            <td>28</td>
                            <td>2</td>
                            <td><span className="rate-badge green">93%</span></td>
                            <td><button className="icon-btn"><i className="fas fa-chevron-right"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* Bottom Section: Low Attendance & Trends */}
        <div className="attendance-bottom-grid">
            <div className="card">
                <h3>Students with Low Attendance</h3>
                <div className="low-attendance-list">
                    <div className="low-attendance-item">
                        <div className="student-info">
                            <div className="student-name">Sarah Williams</div>
                            <div className="student-class">Computer Science 101</div>
                        </div>
                        <div className="student-rate red">72%</div>
                    </div>
                    <div className="low-attendance-item">
                        <div className="student-info">
                            <div className="student-name">David Liu</div>
                            <div className="student-class">Data Structures</div>
                        </div>
                        <div className="student-rate red">68%</div>
                    </div>
                    <div className="low-attendance-item">
                        <div className="student-info">
                            <div className="student-name">Jessica Martinez</div>
                            <div className="student-class">Algorithms</div>
                        </div>
                        <div className="student-rate orange">75%</div>
                    </div>
                    <div className="low-attendance-item">
                        <div className="student-info">
                            <div className="student-name">Robert Chen</div>
                            <div className="student-class">Software Engineering</div>
                        </div>
                        <div className="student-rate orange">78%</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3>Attendance Trends</h3>
                <div className="trends-list">
                    <div className="trend-item">
                        <span className="trend-label">First Hour</span>
                        <div className="trend-right">
                            <span className="trend-rate green">89%</span>
                            <button className="icon-btn"><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                    <div className="trend-item">
                        <span className="trend-label">Last Hour</span>
                        <div className="trend-right">
                            <span className="trend-rate orange">82%</span>
                            <button className="icon-btn"><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                    <div className="trend-item">
                        <span className="trend-label">Tuesdays</span>
                        <div className="trend-right">
                            <span className="trend-rate green">86%</span>
                            <button className="icon-btn"><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Faculty Reports View ---

const FacultyReports = () => (
    <div className="reports-container">
        <div className="reports-header">
            <h2>My Reports</h2>
            <button className="schedule-button monitor-button">
                <i className="fas fa-plus"></i> Generate New Report
            </button>
        </div>

        {/* Quick Stats */}
        <div className="reports-stats-grid">
            <div className="report-stat-card">
                <div className="stat-icon-wrapper red">
                    <i className="fas fa-file-alt"></i>
                </div>
                <div className="stat-content">
                    <div className="stat-value">24</div>
                    <div className="stat-label">Total Reports</div>
                </div>
            </div>
            <div className="report-stat-card">
                <div className="stat-icon-wrapper blue">
                    <i className="fas fa-clock"></i>
                </div>
                <div className="stat-content">
                    <div className="stat-value">3</div>
                    <div className="stat-label">Pending</div>
                </div>
            </div>
            <div className="report-stat-card">
                <div className="stat-icon-wrapper green">
                    <i className="fas fa-check-circle"></i>
                </div>
                <div className="stat-content">
                    <div className="stat-value">21</div>
                    <div className="stat-label">Completed</div>
                </div>
            </div>
            <div className="report-stat-card">
                <div className="stat-icon-wrapper orange">
                    <i className="fas fa-download"></i>
                </div>
                <div className="stat-content">
                    <div className="stat-value">156</div>
                    <div className="stat-label">Downloads</div>
                </div>
            </div>
        </div>

        {/* Report Types */}
        <div className="card">
            <h3>Generate Report</h3>
            <div className="report-types-grid">
                <div className="report-type-card">
                    <div className="report-type-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <h4>Attendance Report</h4>
                    <p>Generate detailed attendance reports for your classes</p>
                    <button className="generate-report-btn">
                        <i className="fas fa-chart-bar"></i> Generate
                    </button>
                </div>

                <div className="report-type-card">
                    <div className="report-type-icon">
                        <i className="fas fa-user-graduate"></i>
                    </div>
                    <h4>Student Performance</h4>
                    <p>View individual student attendance and participation</p>
                    <button className="generate-report-btn">
                        <i className="fas fa-chart-bar"></i> Generate
                    </button>
                </div>

                <div className="report-type-card">
                    <div className="report-type-icon">
                        <i className="fas fa-calendar-week"></i>
                    </div>
                    <h4>Weekly Summary</h4>
                    <p>Get weekly attendance summary across all classes</p>
                    <button className="generate-report-btn">
                        <i className="fas fa-chart-bar"></i> Generate
                    </button>
                </div>

                <div className="report-type-card">
                    <div className="report-type-icon">
                        <i className="fas fa-file-excel"></i>
                    </div>
                    <h4>Custom Export</h4>
                    <p>Export custom data in Excel or PDF format</p>
                    <button className="generate-report-btn">
                        <i className="fas fa-chart-bar"></i> Generate
                    </button>
                </div>
            </div>
        </div>

        {/* Recent Reports */}
        <div className="card">
            <h3>Recent Reports</h3>
            <div className="recent-reports-list">
                <div className="report-item">
                    <div className="report-icon">
                        <i className="fas fa-file-pdf"></i>
                    </div>
                    <div className="report-info">
                        <div className="report-name">CS101 Attendance - November 2024</div>
                        <div className="report-meta">Generated on Nov 15, 2024 • 2.4 MB</div>
                    </div>
                    <div className="report-actions">
                        <button className="icon-btn" title="Download">
                            <i className="fas fa-download"></i>
                        </button>
                        <button className="icon-btn" title="View">
                            <i className="fas fa-eye"></i>
                        </button>
                        <button className="icon-btn" title="Share">
                            <i className="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>

                <div className="report-item">
                    <div className="report-icon">
                        <i className="fas fa-file-excel"></i>
                    </div>
                    <div className="report-info">
                        <div className="report-name">All Classes Weekly Summary</div>
                        <div className="report-meta">Generated on Nov 13, 2024 • 1.8 MB</div>
                    </div>
                    <div className="report-actions">
                        <button className="icon-btn" title="Download">
                            <i className="fas fa-download"></i>
                        </button>
                        <button className="icon-btn" title="View">
                            <i className="fas fa-eye"></i>
                        </button>
                        <button className="icon-btn" title="Share">
                            <i className="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>

                <div className="report-item">
                    <div className="report-icon">
                        <i className="fas fa-file-pdf"></i>
                    </div>
                    <div className="report-info">
                        <div className="report-name">Student Performance Analysis</div>
                        <div className="report-meta">Generated on Nov 10, 2024 • 3.1 MB</div>
                    </div>
                    <div className="report-actions">
                        <button className="icon-btn" title="Download">
                            <i className="fas fa-download"></i>
                        </button>
                        <button className="icon-btn" title="View">
                            <i className="fas fa-eye"></i>
                        </button>
                        <button className="icon-btn" title="Share">
                            <i className="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>

                <div className="report-item">
                    <div className="report-icon">
                        <i className="fas fa-file-excel"></i>
                    </div>
                    <div className="report-info">
                        <div className="report-name">Data Structures Attendance</div>
                        <div className="report-meta">Generated on Nov 8, 2024 • 1.5 MB</div>
                    </div>
                    <div className="report-actions">
                        <button className="icon-btn" title="Download">
                            <i className="fas fa-download"></i>
                        </button>
                        <button className="icon-btn" title="View">
                            <i className="fas fa-eye"></i>
                        </button>
                        <button className="icon-btn" title="Share">
                            <i className="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>

                <div className="report-item">
                    <div className="report-icon">
                        <i className="fas fa-file-pdf"></i>
                    </div>
                    <div className="report-info">
                        <div className="report-name">Semester Overview Report</div>
                        <div className="report-meta">Generated on Nov 1, 2024 • 4.2 MB</div>
                    </div>
                    <div className="report-actions">
                        <button className="icon-btn" title="Download">
                            <i className="fas fa-download"></i>
                        </button>
                        <button className="icon-btn" title="View">
                            <i className="fas fa-eye"></i>
                        </button>
                        <button className="icon-btn" title="Share">
                            <i className="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Faculty Profile View ---

const FacultyProfile = () => (
    <div className="profile-container">
        <h2>My Profile</h2>

        <div className="profile-grid">
            {/* Profile Picture Section */}
            <div className="card profile-picture-section">
                <div className="profile-avatar-large">
                    <i className="fas fa-user-circle"></i>
                </div>
                <h3>Dr. Sarah Johnson</h3>
                <p className="profile-role">Faculty Member</p>
                <p className="profile-department">Computer Science Department</p>
                <button className="schedule-button view-button">
                    <i className="fas fa-camera"></i> Change Photo
                </button>
            </div>

            {/* Personal Information */}
            <div className="card profile-info-section">
                <h3>Personal Information</h3>
                <div className="profile-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-input" value="Dr. Sarah Johnson" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-input" value="sarah.johnson@university.edu" />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" className="form-input" value="+1 (555) 123-4567" />
                    </div>
                    <div className="form-group">
                        <label>Department</label>
                        <select className="form-input">
                            <option>Computer Science</option>
                            <option>Engineering</option>
                            <option>Mathematics</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Office Location</label>
                        <input type="text" className="form-input" value="Building A, Room 305" />
                    </div>
                    <div className="form-group">
                        <label>Office Hours</label>
                        <input type="text" className="form-input" value="Mon-Fri, 2:00 PM - 4:00 PM" />
                    </div>
                </div>
            </div>
        </div>

        {/* Account Settings */}
        <div className="card">
            <h3>Account Settings</h3>
            <div className="profile-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Current Password</label>
                        <input type="password" className="form-input" placeholder="Enter current password" />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" className="form-input" placeholder="Enter new password" />
                    </div>
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" className="form-input" placeholder="Confirm new password" />
                </div>
            </div>
        </div>

        {/* Notification Preferences */}
        <div className="card">
            <h3>Notification Preferences</h3>
            <div className="notification-settings">
                <div className="notification-item">
                    <div className="notification-info">
                        <div className="notification-title">Email Notifications</div>
                        <div className="notification-desc">Receive email updates about attendance and alerts</div>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" checked />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                <div className="notification-item">
                    <div className="notification-info">
                        <div className="notification-title">Low Attendance Alerts</div>
                        <div className="notification-desc">Get notified when student attendance falls below threshold</div>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" checked />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                <div className="notification-item">
                    <div className="notification-info">
                        <div className="notification-title">Class Reminders</div>
                        <div className="notification-desc">Receive reminders 15 minutes before each class</div>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                <div className="notification-item">
                    <div className="notification-info">
                        <div className="notification-title">Weekly Reports</div>
                        <div className="notification-desc">Get weekly summary reports via email</div>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" checked />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
            <button className="schedule-button monitor-button">
                <i className="fas fa-save"></i> Save Changes
            </button>
            <button className="schedule-button view-button">
                <i className="fas fa-times"></i> Cancel
            </button>
        </div>
    </div>
);

// ===========================================
// 3. Main FacultyDashboard Component (The Parent)
// ===========================================
const FacultyDashboard = () => {
    const [activeView, setActiveView] = useState('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <FacultyDashboardView />;
            case 'classes':
                return <MyClasses />;
            case 'attendance':
                return <Attendance />;
            case 'reports':
                return <FacultyReports />;
            case 'profile':
                return <FacultyProfile />;
            default:
                return <FacultyDashboardView />;
        }
    };

    return (
        <div className="dashboard-container">
            <LoggedInHeader theme={facultyTheme} user={facultyUser} />
            <div className="dashboard-body">
                <FacultySidebar activeView={activeView} setActiveView={setActiveView} />
                <div className="main-content-area">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;

