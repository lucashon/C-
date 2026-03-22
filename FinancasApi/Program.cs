var builder = WebApplication.CreateBuilder(args);

// Configuração de CORS (Cross-Origin Resource Sharing):
// Essencial para permitir que o Frontend acesse os recursos da API
// mesmo estando em portas ou domínios diferentes.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.AllowAnyOrigin()   // Permite requisições de qualquer origem
              .AllowAnyHeader()   // Permite qualquer tipo de cabeçalho HTTP
              .AllowAnyMethod();  // Permite todos os métodos (GET, POST, PUT, DELETE)
    });
});

// Adiciona o suporte aos Controllers, permitindo o mapeamento das rotas da API.
builder.Services.AddControllers();

// Configuração do Swagger/OpenAPI:
// Ferramentas para gerar a documentação interativa da API, facilitando os testes de endpoints.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ativa a política de CORS definida anteriormente para que o navegador não bloqueie as requisições do React.
app.UseCors("AllowReact");

// Configurações exclusivas para o ambiente de Desenvolvimento.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();   // Gera o arquivo JSON de especificação da API
    app.UseSwaggerUI(); // Ativa a interface visual para testar os Controllers (ex: localhost:5035/swagger)
}

// Redireciona requisições HTTP para HTTPS para garantir uma camada básica de segurança.
app.UseHttpsRedirection();

// Mapeia automaticamente os métodos dos Controllers para suas respectivas URLs (Rotas).
app.MapControllers();

// Inicia a aplicação e coloca o servidor para "ouvir" as requisições.
app.Run();