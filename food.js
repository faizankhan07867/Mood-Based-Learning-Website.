const foodMenu = {
    salad: { name: 'Power Salad', price: 149, time: '15 mins' },
    shake: { name: 'Protein Shake', price: 99, time: '5 mins' },
    bar: { name: 'Energy Bar', price: 49, time: 'Instant' }
};

function orderFood(item) {
    const food = foodMenu[item];
    if (!food) return;
    
    userData.orders.push({
        item: food.name,
        price: food.price,
        time: new Date().toLocaleString(),
        status: 'ordered'
    });
    
    showNotification(`✅ ${food.name} ordered! (${food.time})`, 'success');
    saveUserData();
    
    // Simulate order processing
    setTimeout(() => {
        showNotification(`🍽️ ${food.name} is being prepared!`, 'warning');
    }, 2000);
    
    // Track for analytics
    gtag('event', 'food_order', {
        item_name: food.name,
        value: food.price
    });
}

// Order History Modal
function showOrderHistory() {
    const historyHTML = userData.orders.slice(-5).map(order => `
        <div class="order-item">
            <span>${order.item} - ₹${order.price}</span>
            <small>${order.time}</small>
        </div>
    `).join('');
    
    // Create modal (simplified)
    showNotification('Recent Orders:\n' + historyHTML, 'info');
}