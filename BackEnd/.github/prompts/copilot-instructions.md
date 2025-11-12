# Copilot Coding Rules for EVDMS Project

## Folder Structure

- **Commands**

  - Path: `LIP.Application/CQRS/Command/[Model]/`
  - File: `[Model][CommandName]Command.cs`
  - Example: `AccountCreateCommand.cs`

- **Queries**

  - Path: `LIP.Application/CQRS/Query/[Model]/`
  - File: `[Model][QueryName]Query.cs`
  - Example: `AccountGetQuery.cs`, `AccountGetAllQuery.cs`

- **Interfaces (Repository)**

  - Path: `LIP.Application/Interface/Repository/`
  - File: `I[Model]Repository.cs`
  - Example: `IAccountRepository.cs`
  - Rules:
    - Each repository interface must contain CRUD methods.
    - Parameters of CRUD methods must use corresponding `Command` or `Query` DTOs.
    - Example:
      ```csharp
      Task<AccountDto> GetAsync(AccountGetQuery query);
      Task<IEnumerable<AccountDto>> GetAllAsync(AccountGetAllQuery query);
      Task<bool> CreateAsync(AccountCreateCommand command);
      Task<bool> UpdateAsync(AccountUpdateCommand command);
      Task<bool> DeleteAsync(AccountDeleteCommand command);
      ```

- **Repositories (Implementation)**

  - Path: `LIP.Infrastructure/Repositories/`
  - File: `[Model]Repository.cs`
  - Example: `AccountRepository.cs`
  - Rules:

    - Implements `I[Model]Repository`.
    - Contains actual database logic (EF Core / Dapper).
    - Follow async/await pattern.
    - Queries (`GetAsync`, `GetAllAsync`) must use `.AsNoTracking()`.
    - Example:

      ```csharp
      public class AccountRepository : IAccountRepository
      {
          private readonly EVDMSDbContext _context;

          public AccountRepository(EVDMSDbContext context)
          {
              _context = context;
          }

          public async Task<AccountDto> GetAsync(AccountGetQuery query)
          {
              return await _context.Accounts
                  .AsNoTracking()
                  .FirstOrDefaultAsync(a => a.Id == query.Id);
          }

          public async Task<IEnumerable<AccountDto>> GetAllAsync(AccountGetAllQuery query)
          {
              return await _context.Accounts
                  .AsNoTracking()
                  .ToListAsync();
          }

          public async Task<bool> CreateAsync(AccountCreateCommand command)
          {
              var account = new Account { ... };
              _context.Accounts.Add(account);
              await _context.SaveChangesAsync();
              return true;
          }

          public async Task<bool> UpdateAsync(AccountUpdateCommand command)
          {
              var account = await _context.Accounts.FindAsync(command.Id);
              // update props
              await _context.SaveChangesAsync();
              return true;
          }

          public async Task<bool> DeleteAsync(AccountDeleteCommand command)
          {
              var account = await _context.Accounts.FindAsync(command.Id);
              if (account == null) return false;
              _context.Accounts.Remove(account);
              await _context.SaveChangesAsync();
              return true;
          }
      }
      ```

---

## Rule: Use Domain Entities

- All Commands and Queries must be generated based on the properties of the corresponding model inside `EVDMS.Domains/Entities`.
- Do not invent properties. Only use properties defined in the entity class.
- Repository interfaces and implementations must operate strictly on these domain entities.
- When creating `Command` or `Query`, map directly to fields in the entity from `LIP.Domain/Entities/[Model].cs`.
- Example: If there is a `Car` entity in `LIP.Domain/Entities/Car.cs`, then:
  - `CreateCarCommand` includes all required properties from `Car`.
  - `GetCarQuery` must return data mapped from `Car`.
  - `ICarRepository` methods (Create, Update, Delete, GetById, GetAll) must use `Car`.

---

## Rule: Soft Delete

- If an entity has a **Soft Delete** field (e.g., `IsDeleted`, `DeletedAt`), then:
  - Create a Command: `[Model]SoftDeleteCommand.cs`
  - Create a Handler: `[Model]SoftDeleteHandler.cs`
- Repository interface `I[Model]Repository` must have:
  ```csharp
  Task<bool> SoftDeleteAsync([Model]SoftDeleteCommand command);
  ```
- Repository implementation `[Model]Repository.cs` must implement logic:
  - Find entity by `Id`.
  - Set `IsDeleted = true` and `DeletedAt = DateTime.UtcNow`.
  - Save changes with `_context.SaveChangesAsync()`.
- Example:

  ```csharp
  public async Task<bool> SoftDeleteAsync(AccountSoftDeleteCommand command)
  {
      var account = await _context.Accounts.FindAsync(command.Id);
      if (account == null) return false;

      account.IsDeleted = true;
      account.DeletedAt = DateTime.UtcNow;

      await _context.SaveChangesAsync();
      return true;
  }
  ```

---

## Naming Conventions

- Commands: `[Model][Action]Command` (including `SoftDeleteCommand`)
- Queries: `[Model][Action]Query`
- Interfaces: `I[Model]Repository`
- Implementations: `[Model]Repository`

---

## Example

If the model is **Account**:

- Command: `AccountCreateCommand.cs` in `LIP.Application/CQRS/Command/Account`
- Query: `AccountGetQuery.cs` in `LIP.Application/CQRS/Query/Account`
- Interface: `IAccountRepository.cs` in `LIP.Application/Interface/Repository`
- Repository: `AccountRepository.cs` in `LIP.Infrastructure/Repositories`
- Soft Delete: `AccountSoftDeleteCommand.cs` + `SoftDeleteAsync` method in repository
