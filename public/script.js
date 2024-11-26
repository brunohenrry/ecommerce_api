const apiUrl = "http://localhost:3000";

// Função para verificar se o servidor está disponível
async function checkServer() {
  try {
    const response = await fetch(`${apiUrl}/products`);
    if (!response.ok) {
      throw new Error("Servidor não está respondendo corretamente.");
    }
    return true;
  } catch (error) {
    console.error("Erro ao conectar com o servidor", error);
    alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    return false;
  }
}

// Função para cadastrar um produto
document.getElementById("product-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const description = document.getElementById("product-description").value;

  if (!name || !price) {
    return alert("Nome e preço são obrigatórios!");
  }

  const serverAvailable = await checkServer();
  if (!serverAvailable) return;

  try {
    const response = await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description }),
    });

    if (response.ok) {
      alert("Produto cadastrado com sucesso!");
      fetchProducts();
    } else {
      const error = await response.json();
      alert(`Erro ao cadastrar o produto: ${error.message}`);
    }
  } catch (error) {
    console.error("Erro ao cadastrar o produto", error);
    alert("Erro ao cadastrar o produto.");
  }
});

// Função para listar produtos
async function fetchProducts() {
  if (!(await checkServer())) return;

  try {
    const response = await fetch(`${apiUrl}/products`);
    if (!response.ok) {
      throw new Error("Erro ao buscar os produtos.");
    }
    const products = await response.json();
    const productList = document.getElementById("product-list");
    productList.innerHTML = products
      .map(
        (p) =>
          `<li>
            <strong>${p.name}</strong> - R$ ${p.price}
            <button onclick="editProduct('${p._id}')">Editar</button>
            <button onclick="deleteProduct('${p._id}')">Excluir</button>
          </li>`
      )
      .join("");
  } catch (error) {
    console.error("Erro ao buscar os produtos", error);
    alert("Erro ao buscar os produtos.");
  }
}

// Função para excluir um produto
async function deleteProduct(id) {
  try {
    const response = await fetch(`${apiUrl}/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Produto excluído com sucesso!");
      fetchProducts();
    } else {
      const error = await response.json();
      alert(`Erro ao excluir o produto: ${error.message}`);
    }
  } catch (error) {
    console.error("Erro ao excluir o produto", error);
    alert("Erro ao excluir o produto.");
  }
}

// Função para editar um produto
async function editProduct(id) {
  const name = prompt("Novo nome do produto:");
  const price = prompt("Novo preço do produto:");
  const description = prompt("Nova descrição do produto:");

  try {
    const response = await fetch(`${apiUrl}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description }),
    });

    if (response.ok) {
      alert("Produto atualizado com sucesso!");
      fetchProducts();
    } else {
      const error = await response.json();
      alert(`Erro ao editar o produto: ${error.message}`);
    }
  } catch (error) {
    console.error("Erro ao editar o produto", error);
    alert("Erro ao editar o produto.");
  }
}

// Função para cadastrar um cliente
document.getElementById("customer-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("customer-name").value;
  const email = document.getElementById("customer-email").value;
  const phone = document.getElementById("customer-phone").value;

  if (!name || !email) {
    return alert("Nome e email são obrigatórios!");
  }

  const serverAvailable = await checkServer();
  if (!serverAvailable) return;

  try {
    const response = await fetch(`${apiUrl}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });

    if (response.ok) {
      alert("Cliente cadastrado com sucesso!");
      fetchCustomers();
    } else {
      const error = await response.json();
      alert(`Erro ao cadastrar o cliente: ${error.message}`);
    }
  } catch (error) {
    console.error("Erro ao cadastrar o cliente", error);
    alert("Erro ao cadastrar o cliente.");
  }
});

// Função para listar clientes
async function fetchCustomers() {
  if (!(await checkServer())) return;

  try {
    const response = await fetch(`${apiUrl}/customers`);
    if (!response.ok) {
      throw new Error("Erro ao buscar os clientes.");
    }
    const customers = await response.json();
    const customerList = document.getElementById("customer-list");
    customerList.innerHTML = customers
      .map(
        (c) =>
          `<li>
            <strong>${c.name}</strong> - ${c.email}
            <button onclick="deleteCustomer('${c._id}')">Excluir</button>
          </li>`
      )
      .join("");
  } catch (error) {
    console.error("Erro ao buscar os clientes", error);
    alert("Erro ao buscar os clientes.");
  }
}

// Função para excluir um cliente
async function deleteCustomer(id) {
  try {
    const response = await fetch(`${apiUrl}/customers/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Cliente excluído com sucesso!");
      fetchCustomers();
    } else {
      const error = await response.json();
      alert(`Erro ao excluir o cliente: ${error.message}`);
    }
  } catch (error) {
    console.error("Erro ao excluir o cliente", error);
    alert("Erro ao excluir o cliente.");
  }
}

// Carregar os cadastros ao carregar a página
window.onload = async () => {
  const serverAvailable = await checkServer();
  if (serverAvailable) {
    fetchProducts();
    fetchCustomers();
  }
};
