// ===== Expense Tracker Application =====

// ===== Categories Configuration =====
const categories = {
    expense: [
        { id: 'food', name: 'Food & Dining', icon: 'fa-utensils', color: '#f97316' },
        { id: 'transport', name: 'Transportation', icon: 'fa-car', color: '#3b82f6' },
        { id: 'shopping', name: 'Shopping', icon: 'fa-shopping-bag', color: '#ec4899' },
        { id: 'bills', name: 'Bills & Utilities', icon: 'fa-file-invoice', color: '#8b5cf6' },
        { id: 'entertainment', name: 'Entertainment', icon: 'fa-film', color: '#06b6d4' },
        { id: 'health', name: 'Healthcare', icon: 'fa-heartbeat', color: '#ef4444' },
        { id: 'education', name: 'Education', icon: 'fa-graduation-cap', color: '#10b981' },
        { id: 'other', name: 'Other', icon: 'fa-ellipsis-h', color: '#64748b' }
    ],
    income: [
        { id: 'salary', name: 'Salary', icon: 'fa-briefcase', color: '#10b981' },
        { id: 'freelance', name: 'Freelance', icon: 'fa-laptop', color: '#06b6d4' },
        { id: 'investment', name: 'Investment', icon: 'fa-chart-line', color: '#8b5cf6' },
        { id: 'gift', name: 'Gift', icon: 'fa-gift', color: '#ec4899' },
        { id: 'other', name: 'Other', icon: 'fa-ellipsis-h', color: '#64748b' }
    ]
};

// ===== DOM Elements =====
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const pageTitle = document.getElementById('pageTitle');
const currentDate = document.getElementById('currentDate');

// Dashboard Elements
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const balanceEl = document.getElementById('balance');
const recentTransactions = document.getElementById('recentTransactions');
const chartLegend = document.getElementById('chartLegend');
const monthlyChart = document.getElementById('monthlyChart');

// Transactions View Elements
const transactionsTable = document.getElementById('transactionsTable');
const emptyState = document.getElementById('emptyState');
const filterType = document.getElementById('filterType');
const filterCategory = document.getElementById('filterCategory');
const filterMonth = document.getElementById('filterMonth');
const searchInput = document.getElementById('searchInput');

// Form Elements
const transactionForm = document.getElementById('transactionForm');
const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');

// Modal Elements
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const deleteModal = document.getElementById('deleteModal');

// Buttons
const startBtn = document.getElementById('startBtn');
const addBtnHeader = document.getElementById('addBtnHeader');
const exportBtn = document.getElementById('exportBtn');
const cancelBtn = document.getElementById('cancelBtn');

// ===== Sample Data =====
const sampleData = [
    // Current Month (January 2026)
    { id: '1', type: 'income', amount: 75000, date: '2026-01-25', category: 'salary', description: 'Monthly Salary', notes: 'January salary' },
    { id: '2', type: 'expense', amount: 15000, date: '2026-01-28', category: 'bills', description: 'House Rent', notes: '' },
    { id: '3', type: 'expense', amount: 3500, date: '2026-01-27', category: 'food', description: 'Grocery Shopping', notes: 'Monthly groceries from BigBasket' },
    { id: '4', type: 'expense', amount: 999, date: '2026-01-26', category: 'entertainment', description: 'Netflix Subscription', notes: '' },
    { id: '5', type: 'expense', amount: 2500, date: '2026-01-24', category: 'transport', description: 'Petrol for Car', notes: '' },
    { id: '6', type: 'expense', amount: 1200, date: '2026-01-22', category: 'food', description: 'Restaurant Dinner', notes: 'Family dinner at Barbeque Nation' },
    { id: '7', type: 'income', amount: 15000, date: '2026-01-20', category: 'freelance', description: 'Web Development Project', notes: 'Logo design project' },
    { id: '8', type: 'expense', amount: 5000, date: '2026-01-18', category: 'shopping', description: 'New Clothes', notes: 'Winter shopping' },

    // December 2025
    { id: '9', type: 'income', amount: 75000, date: '2025-12-25', category: 'salary', description: 'Monthly Salary', notes: 'December salary' },
    { id: '10', type: 'expense', amount: 15000, date: '2025-12-28', category: 'bills', description: 'House Rent', notes: '' },
    { id: '11', type: 'expense', amount: 8000, date: '2025-12-24', category: 'shopping', description: 'Christmas Shopping', notes: 'Gifts for family' },
    { id: '12', type: 'expense', amount: 2000, date: '2025-12-20', category: 'entertainment', description: 'Movie Night', notes: 'Avatar 3 IMAX' },
    { id: '13', type: 'expense', amount: 4500, date: '2025-12-15', category: 'food', description: 'Party Catering', notes: 'Christmas party food' },
    { id: '14', type: 'income', amount: 25000, date: '2025-12-10', category: 'investment', description: 'Stock Dividends', notes: 'Q4 dividends' },

    // November 2025
    { id: '15', type: 'income', amount: 75000, date: '2025-11-25', category: 'salary', description: 'Monthly Salary', notes: '' },
    { id: '16', type: 'expense', amount: 15000, date: '2025-11-28', category: 'bills', description: 'House Rent', notes: '' },
    { id: '17', type: 'expense', amount: 12000, date: '2025-11-20', category: 'health', description: 'Medical Checkup', notes: 'Annual health checkup' },
    { id: '18', type: 'expense', amount: 3000, date: '2025-11-15', category: 'transport', description: 'Car Service', notes: '' },
    { id: '19', type: 'expense', amount: 2500, date: '2025-11-10', category: 'food', description: 'Diwali Sweets', notes: '' },

    // October 2025
    { id: '20', type: 'income', amount: 75000, date: '2025-10-25', category: 'salary', description: 'Monthly Salary', notes: '' },
    { id: '21', type: 'expense', amount: 15000, date: '2025-10-28', category: 'bills', description: 'House Rent', notes: '' },
    { id: '22', type: 'expense', amount: 25000, date: '2025-10-20', category: 'shopping', description: 'Diwali Shopping', notes: 'Clothes and decorations' },
    { id: '23', type: 'income', amount: 10000, date: '2025-10-15', category: 'gift', description: 'Diwali Bonus', notes: 'From company' },
    { id: '24', type: 'expense', amount: 5000, date: '2025-10-10', category: 'education', description: 'Online Course', notes: 'React Advanced Course' },

    // September 2025
    { id: '25', type: 'income', amount: 75000, date: '2025-09-25', category: 'salary', description: 'Monthly Salary', notes: '' },
    { id: '26', type: 'expense', amount: 15000, date: '2025-09-28', category: 'bills', description: 'House Rent', notes: '' },
    { id: '27', type: 'expense', amount: 4000, date: '2025-09-20', category: 'food', description: 'Birthday Celebration', notes: '' },
    { id: '28', type: 'expense', amount: 8000, date: '2025-09-15', category: 'transport', description: 'Flight Tickets', notes: 'Trip to Goa' },

    // August 2025
    { id: '29', type: 'income', amount: 75000, date: '2025-08-25', category: 'salary', description: 'Monthly Salary', notes: '' },
    { id: '30', type: 'expense', amount: 15000, date: '2025-08-28', category: 'bills', description: 'House Rent', notes: '' },
    { id: '31', type: 'expense', amount: 6000, date: '2025-08-20', category: 'entertainment', description: 'Concert Tickets', notes: 'AR Rahman concert' },
    { id: '32', type: 'income', amount: 20000, date: '2025-08-10', category: 'freelance', description: 'Mobile App Project', notes: '' }
];

// ===== State =====
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let deleteId = null;

// Load sample data if no transactions exist
if (transactions.length === 0) {
    transactions = [...sampleData];
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// ===== Initialize =====
function init() {
    setCurrentDate();
    loadCategories();
    updateDashboard();
    renderRecentTransactions();
    renderTransactionsTable();
    renderCategoryChart();
    renderMonthlyChart();
    setupEventListeners();

    // Set default date to today
    dateInput.value = new Date().toISOString().split('T')[0];

    // Set filter month to current month
    filterMonth.value = new Date().toISOString().slice(0, 7);
}

// ===== Set Current Date =====
function setCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = new Date().toLocaleDateString('en-IN', options);
}

// ===== Load Categories =====
function loadCategories(type = 'expense', selectEl = categorySelect) {
    selectEl.innerHTML = '';
    const cats = categories[type];
    cats.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        selectEl.appendChild(option);
    });
}

// ===== Save to LocalStorage =====
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// ===== Format Currency =====
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// ===== Format Date =====
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ===== Get Category Info =====
function getCategoryInfo(type, categoryId) {
    const cats = categories[type];
    return cats.find(c => c.id === categoryId) || cats[cats.length - 1];
}

// ===== Update Dashboard =====
function updateDashboard() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    totalIncomeEl.textContent = formatCurrency(totalIncome);
    totalExpenseEl.textContent = formatCurrency(totalExpense);
    balanceEl.textContent = formatCurrency(balance);

    // Color balance based on positive/negative
    balanceEl.style.color = balance >= 0 ? 'var(--success)' : 'var(--danger)';
}

// ===== Render Recent Transactions =====
function renderRecentTransactions() {
    const recent = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    if (recent.length === 0) {
        recentTransactions.innerHTML = `
            <div class="empty-state show" style="padding: 40px;">
                <i class="fas fa-receipt"></i>
                <h3>No transactions yet</h3>
                <p>Add your first transaction to get started!</p>
            </div>
        `;
        return;
    }

    recentTransactions.innerHTML = recent.map(t => {
        const cat = getCategoryInfo(t.type, t.category);
        return `
            <div class="transaction-item">
                <div class="transaction-icon ${t.type}">
                    <i class="fas ${cat.icon}"></i>
                </div>
                <div class="transaction-details">
                    <p class="transaction-description">${t.description}</p>
                    <p class="transaction-category">${cat.name}</p>
                </div>
                <div>
                    <p class="transaction-amount ${t.type}">
                        ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
                    </p>
                    <p class="transaction-date">${formatDate(t.date)}</p>
                </div>
            </div>
        `;
    }).join('');
}

// ===== Render Transactions Table =====
function renderTransactionsTable() {
    let filtered = [...transactions];

    // Apply filters
    const typeFilter = filterType.value;
    const categoryFilter = filterCategory.value;
    const monthFilter = filterMonth.value;
    const searchFilter = searchInput.value.toLowerCase();

    if (typeFilter !== 'all') {
        filtered = filtered.filter(t => t.type === typeFilter);
    }

    if (categoryFilter !== 'all') {
        filtered = filtered.filter(t => t.category === categoryFilter);
    }

    if (monthFilter) {
        filtered = filtered.filter(t => t.date.startsWith(monthFilter));
    }

    if (searchFilter) {
        filtered = filtered.filter(t =>
            t.description.toLowerCase().includes(searchFilter) ||
            t.category.toLowerCase().includes(searchFilter)
        );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Show/hide empty state
    if (filtered.length === 0) {
        transactionsTable.innerHTML = '';
        emptyState.classList.add('show');
        return;
    }

    emptyState.classList.remove('show');

    transactionsTable.innerHTML = filtered.map(t => {
        const cat = getCategoryInfo(t.type, t.category);
        return `
            <tr>
                <td>${formatDate(t.date)}</td>
                <td>${t.description}</td>
                <td>
                    <span class="category-badge">
                        <i class="fas ${cat.icon}"></i>
                        ${cat.name}
                    </span>
                </td>
                <td class="amount ${t.type}">
                    ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
                </td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn edit" onclick="openEditModal('${t.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="openDeleteModal('${t.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ===== Render Category Chart (Pie Chart using Canvas) =====
function renderCategoryChart() {
    const canvas = document.getElementById('categoryChart');
    const ctx = canvas.getContext('2d');

    // Get expense totals by category
    const expensesByCategory = {};
    transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
        });

    const categoryIds = Object.keys(expensesByCategory);
    const values = Object.values(expensesByCategory);
    const total = values.reduce((a, b) => a + b, 0);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (total === 0) {
        // Draw empty state
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 70, 0, Math.PI * 2);
        ctx.fillStyle = '#334155';
        ctx.fill();

        ctx.fillStyle = '#64748b';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('No data', canvas.width / 2, canvas.height / 2 + 5);

        chartLegend.innerHTML = '';
        return;
    }

    // Draw pie chart
    let startAngle = -Math.PI / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;

    categoryIds.forEach((catId, index) => {
        const cat = getCategoryInfo('expense', catId);
        const value = expensesByCategory[catId];
        const sliceAngle = (value / total) * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = cat.color;
        ctx.fill();

        startAngle += sliceAngle;
    });

    // Draw center circle for donut effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#1e293b';
    ctx.fill();

    // Render legend
    chartLegend.innerHTML = categoryIds.map(catId => {
        const cat = getCategoryInfo('expense', catId);
        const value = expensesByCategory[catId];
        const percentage = ((value / total) * 100).toFixed(1);
        return `
            <div class="legend-item">
                <span class="legend-color" style="background: ${cat.color}"></span>
                ${cat.name} (${percentage}%)
            </div>
        `;
    }).join('');
}

// ===== Render Monthly Chart =====
function renderMonthlyChart() {
    const months = [];
    const today = new Date();

    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        months.push({
            key: date.toISOString().slice(0, 7),
            label: date.toLocaleDateString('en-IN', { month: 'short' })
        });
    }

    // Calculate monthly totals
    const monthlyData = months.map(month => {
        const income = transactions
            .filter(t => t.type === 'income' && t.date.startsWith(month.key))
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = transactions
            .filter(t => t.type === 'expense' && t.date.startsWith(month.key))
            .reduce((sum, t) => sum + t.amount, 0);

        return { ...month, income, expense };
    });

    // Find max value for scaling
    const maxValue = Math.max(
        ...monthlyData.map(m => Math.max(m.income, m.expense)),
        1000
    );

    // Render bars
    monthlyChart.innerHTML = monthlyData.map(m => {
        const incomeHeight = (m.income / maxValue) * 150;
        const expenseHeight = (m.expense / maxValue) * 150;

        return `
            <div class="bar-group">
                <div class="bar-container">
                    <div class="bar income" style="height: ${Math.max(incomeHeight, 4)}px" title="Income: ${formatCurrency(m.income)}"></div>
                    <div class="bar expense" style="height: ${Math.max(expenseHeight, 4)}px" title="Expense: ${formatCurrency(m.expense)}"></div>
                </div>
                <span class="bar-label">${m.label}</span>
            </div>
        `;
    }).join('');
}

// ===== Add Transaction =====
function addTransaction(e) {
    e.preventDefault();

    const type = document.querySelector('input[name="type"]:checked').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const notes = document.getElementById('notes').value;

    const transaction = {
        id: Date.now().toString(),
        type,
        amount,
        date,
        category,
        description,
        notes,
        createdAt: new Date().toISOString()
    };

    transactions.push(transaction);
    saveTransactions();

    // Reset form
    transactionForm.reset();
    document.getElementById('typeExpense').checked = true;
    loadCategories('expense');
    dateInput.value = new Date().toISOString().split('T')[0];

    // Update UI
    updateDashboard();
    renderRecentTransactions();
    renderTransactionsTable();
    renderCategoryChart();
    renderMonthlyChart();

    // Switch to dashboard
    switchView('dashboard');

    // Show success feedback
    showToast('Transaction added successfully!', 'success');
}

// ===== Edit Transaction =====
function openEditModal(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    document.getElementById('editId').value = id;
    document.getElementById('editAmount').value = transaction.amount;
    document.getElementById('editDate').value = transaction.date;
    document.getElementById('editDescription').value = transaction.description;

    // Set type
    if (transaction.type === 'expense') {
        document.getElementById('editTypeExpense').checked = true;
    } else {
        document.getElementById('editTypeIncome').checked = true;
    }

    // Load categories for this type
    loadCategories(transaction.type, document.getElementById('editCategory'));
    document.getElementById('editCategory').value = transaction.category;

    editModal.classList.add('active');
}

function saveEdit(e) {
    e.preventDefault();

    const id = document.getElementById('editId').value;
    const index = transactions.findIndex(t => t.id === id);

    if (index === -1) return;

    transactions[index] = {
        ...transactions[index],
        type: document.querySelector('input[name="editType"]:checked').value,
        amount: parseFloat(document.getElementById('editAmount').value),
        date: document.getElementById('editDate').value,
        category: document.getElementById('editCategory').value,
        description: document.getElementById('editDescription').value
    };

    saveTransactions();
    closeEditModal();

    updateDashboard();
    renderRecentTransactions();
    renderTransactionsTable();
    renderCategoryChart();
    renderMonthlyChart();

    showToast('Transaction updated!', 'success');
}

function closeEditModal() {
    editModal.classList.remove('active');
}

// ===== Delete Transaction =====
function openDeleteModal(id) {
    deleteId = id;
    deleteModal.classList.add('active');
}

function confirmDelete() {
    if (!deleteId) return;

    transactions = transactions.filter(t => t.id !== deleteId);
    saveTransactions();

    deleteModal.classList.remove('active');
    deleteId = null;

    updateDashboard();
    renderRecentTransactions();
    renderTransactionsTable();
    renderCategoryChart();
    renderMonthlyChart();

    showToast('Transaction deleted!', 'success');
}

function closeDeleteModal() {
    deleteModal.classList.remove('active');
    deleteId = null;
}

// ===== Export Data =====
function exportData() {
    if (transactions.length === 0) {
        showToast('No transactions to export!', 'warning');
        return;
    }

    const csv = [
        ['Date', 'Type', 'Category', 'Description', 'Amount', 'Notes'].join(','),
        ...transactions.map(t => [
            t.date,
            t.type,
            t.category,
            `"${t.description}"`,
            t.amount,
            `"${t.notes || ''}"`
        ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('Exported successfully!', 'success');
}

// ===== Switch View =====
function switchView(viewName) {
    views.forEach(v => v.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    document.getElementById(`${viewName}View`).classList.add('active');
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        transactions: 'Transactions',
        add: 'Add Transaction'
    };
    pageTitle.textContent = titles[viewName];
}

// ===== Toast Notification =====
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--warning)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== Populate Filter Categories =====
function populateFilterCategories() {
    const allCategories = [...categories.expense, ...categories.income];
    const unique = allCategories.filter((cat, index, self) =>
        index === self.findIndex(c => c.id === cat.id)
    );

    filterCategory.innerHTML = '<option value="all">All Categories</option>';
    unique.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        filterCategory.appendChild(option);
    });
}

// ===== Setup Event Listeners =====
function setupEventListeners() {
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(item.dataset.view);
        });
    });

    // View all link
    document.querySelector('.view-all').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('transactions');
    });

    // Header buttons
    addBtnHeader.addEventListener('click', () => switchView('add'));
    exportBtn.addEventListener('click', exportData);
    cancelBtn.addEventListener('click', () => switchView('dashboard'));

    // Form submission
    transactionForm.addEventListener('submit', addTransaction);

    // Type toggle - update categories
    document.querySelectorAll('input[name="type"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            loadCategories(e.target.value);
        });
    });

    // Edit form type toggle
    document.querySelectorAll('input[name="editType"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            loadCategories(e.target.value, document.getElementById('editCategory'));
        });
    });

    // Edit form
    editForm.addEventListener('submit', saveEdit);
    document.getElementById('closeModal').addEventListener('click', closeEditModal);
    document.getElementById('cancelEdit').addEventListener('click', closeEditModal);

    // Delete modal
    document.getElementById('confirmDelete').addEventListener('click', confirmDelete);
    document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);

    // Filters
    filterType.addEventListener('change', renderTransactionsTable);
    filterCategory.addEventListener('change', renderTransactionsTable);
    filterMonth.addEventListener('change', renderTransactionsTable);
    searchInput.addEventListener('input', renderTransactionsTable);

    // Close modals on outside click
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
    });
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });

    // Populate filter categories
    populateFilterCategories();
}

// ===== Initialize App =====
init();
