# 👑 SovereignFit | Dashboard de Alta Performance

O **SovereignFit** é um ecossistema Full Stack projetado para o monitoramento de treinos de elite (Boxe, Muay Thai, Musculação). Este projeto foi construído para demonstrar o domínio de uma arquitetura moderna, escalável e de fácil manutenção, unindo a robustez do ecossistema .NET com a agilidade do React.

---

## 🛠️ Stack Técnica

### **Backend (.NET 9)**
* **Arquitetura:** Clean Architecture (Separação de preocupações: Domain, Application, Infrastructure e API).
* **Banco de Dados:** SQLite (Fácil portabilidade e inicialização).
* **ORM:** Entity Framework Core com suporte a Auto-Migrations.
* **Padrões:** Repository Pattern, DTOs e Injeção de Dependência.

### **Frontend (React + Vite)**
* **Linguagem:** TypeScript (Tipagem estrita para segurança de dados).
* **Estilização:** Tailwind CSS v4 (Design minimalista e "Dark Mode" nativo).
* **Consumo de API:** Axios com hooks customizados.
* **UX:** Modais de confirmação personalizados e feedback visual de carregamento.

---

## 🚀 Como Inicializar

Este projeto foi desenhado para ser "Clone & Play". Não é necessário configurar servidores de banco de dados externos.

### **1. Backend**
1. Navegue até a pasta `DiaryTrain.API`.
2. Execute o comando:
   ```bash```
   ```dotnet run```

Nota: O banco de dados diarytrain.db será criado automaticamente na primeira execução através do sistema de Auto-Migrations embutido no Program.cs.

### **2. Frontend**
1. Navegue até a pasta do frontend.
2. Instale as dependências:
   ```npm install```
3. Inicie o servidor de desenvolvimento:
   ```npm run dev```


🏗️ Arquitetura do Sistema
O sistema segue os princípios da Soberania de Código, garantindo que as regras de negócio sejam independentes de frameworks externos:

    Domain: Contém as entidades principais (Workout, Exercise) e as interfaces de repositório.

    Application: Onde residem os serviços e a lógica de processamento de dados.

    Infrastructure: Responsável pela persistência e configuração do Entity Framework.

    API: Pontos de entrada REST que expõem os recursos para o mundo externo.

## 🎯 Roadmap de Evolução

### **Fase 1: Fundação (Concluída ✅)**
- [x] Arquitetura em camadas (Clean Architecture).
- [x] Persistência real com SQLite.
- [x] CRUD completo e UX de confirmação.

### **Fase 2: Inteligência de Dados (Próximos Passos 🚀)**
- [ ] **Dashboard Analítico:** Visualização da consistência de treinos com Recharts.
- [ ] **Evolução de Cargas:** Rastreamento do progresso de peso em exercícios específicos.
- [ ] **Sovereign UI:** Refinamento de animações e transições entre páginas.

Desenvolvido por Alex Augusto Castro Boscariol Estudante de Sistemas de Informação.