const productsData = {
    1: {
        id: 1,
        name: "Camisa Amor",
        price: 250.00,
        image: "imagens/WhatsApp Image 2025-10-23 at 21.22.57.jpeg",
        description: "Uma camisa especial feita com todo carinho e amor para o Celso Sedutor. Perfeita para demonstrar todo o seu afeto de forma estilosa e confortável.",
        details: [
            "Material: 100% algodão premium",
            "Tamanhos disponíveis: P, M, G, GG",
            "Estampa exclusiva e personalizada",
            "Lavagem em máquina",
            "Embalagem especial para presente"
        ]
    },
    2: {
        id: 2,
        name: "Moletom Homem Gostoso",
        price: 199.90,
        image: "imagens/WhatsApp Image 2025-10-23 at 21.22.58.jpeg",
        description: "Moletom super confortável e quentinho para o homem mais gostoso. Ideal para os dias frios ou para relaxar em casa com muito estilo.",
        details: [
            "Material: Moletom flanelado",
            "Tamanhos: P, M, G, GG",
            "Capuz ajustável",
            "Bolso canguru frontal",
            "Perfeito para todas as estações"
        ]
    },
    3: {
        id: 3,
        name: "Garrafa Sedutora de Homem Gostoso",
        price: 310.50,
        image: "imagens/WhatsApp Image 2025-10-23 at 21.22.57 (2).jpeg",
        description: "Garrafa térmica exclusiva para manter suas bebidas sempre na temperatura ideal. Design sedutor e sofisticado, perfeita para o dia a dia.",
        details: [
            "Capacidade: 500ml",
            "Material: Aço inoxidável",
            "Mantém temperatura por até 12 horas",
            "Design ergonômico",
            "À prova de vazamentos"
        ]
    },
    4: {
        id: 4,
        name: "Bolsa de Homem Cajuzinho",
        price: 145.00,
        image: "imagens/WhatsApp Image 2025-10-23 at 21.22.58 (1).jpeg",
        description: "Bolsa compacta e estilosa para carregar o essencial com muito charme. Perfeita para passeios e aventuras do dia a dia.",
        details: [
            "Material: Lona resistente",
            "Múltiplos compartimentos",
            "Alça ajustável",
            "Zíper de alta qualidade",
            "Design moderno e versátil"
        ]
    },
    5: {
        id: 5,
        name: "Caneca do Meu Amor",
        price: 275.00,
        image: "imagens/WhatsApp Image 2025-10-23 at 20.54.13.jpeg",
        description: "Caneca personalizada para tomar aquele café ou chá especial pensando em quem você ama. Cada gole será uma demonstração de carinho.",
        details: [
            "Capacidade: 350ml",
            "Material: Cerâmica de alta qualidade",
            "Estampa personalizada",
            "Resistente a micro-ondas",
            "Embalagem de presente inclusa"
        ]
    },
    6: {
        id: 6,
        name: "Capinha do Meu Lindo",
        price: 200.00,
        image: "imagens/WhatsApp Image 2025-10-23 at 21.22.57 (1).jpeg",
        description: "Capinha de celular exclusiva para proteger o aparelho do meu lindo com muito estilo. Design único e proteção garantida.",
        details: [
            "Material: Silicone premium",
            "Proteção anti-impacto",
            "Compatível com diversos modelos",
            "Design exclusivo",
            "Fácil instalação"
        ]
    }
};

// Carrinho de compras
let cart = [];
let currentProductId = null;

// Função para mostrar detalhes do produto
function showProductDetails(productId) {
    const product = productsData[productId];
    if (!product) return;
    
    currentProductId = productId;
    
    // Preencher informações no modal
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('modal-product-description').textContent = product.description;
    
    // Preencher detalhes
    const detailsList = document.getElementById('modal-product-details');
    detailsList.innerHTML = '';
    product.details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailsList.appendChild(li);
    });
    
    // Mostrar modal
    const modal = document.getElementById('product-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Função para fechar detalhes do produto
function closeProductDetails() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProductId = null;
}

// Fechar modal ao clicar fora dele
document.addEventListener('click', function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeProductDetails();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProductDetails();
    }
});

// Adicionar ao carrinho a partir do modal
function addToCartFromModal() {
    if (!currentProductId) return;
    
    const product = productsData[currentProductId];
    cart.push({
        name: product.name,
        price: product.price
    });
    
    updateCart();
    closeProductDetails();
    
    // Mostrar feedback visual
    alert(`${product.name} foi adicionado ao carrinho! 💖`);
}

// Função para adicionar ao carrinho (botão direto)
function addToCart(button) {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    
    cart.push({ name, price });
    updateCart();
    
    // Feedback visual
    button.textContent = '✓ ADICIONADO';
    button.style.background = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = 'COMPRAR';
        button.style.background = '';
    }, 1500);
}

// Atualizar visualização do carrinho
function updateCart() {
    const cartList = document.getElementById('cart-list');
    const cartCounter = document.getElementById('cart-counter');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartList.innerHTML = '<li class="empty-message">Nenhum presente especial aqui...</li>';
        cartCounter.textContent = '0';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }
    
    cartList.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.padding = '15px';
        li.style.borderBottom = '1px solid #f0f0f0';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        
        li.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <span style="color: #c44569;">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <button onclick="removeFromCart(${index})" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                Remover
            </button>
        `;
        
        cartList.appendChild(li);
        total += item.price;
    });
    
    cartCounter.textContent = cart.length;
    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Remover item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Toggle do painel do carrinho
function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.classList.toggle('active');
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
});