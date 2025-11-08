using LIP.Application.Interface.Repository;
using LIP.Domain.Entities;
using LIP.Infrastructure.Persistency;
using Microsoft.EntityFrameworkCore;

namespace LIP.Infrastructure.Repositories;

public class PaymentRepository : IPaymentRepository
{
    private readonly ApplicationDbContext _context;

    public PaymentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Payment> CreatePayment(Payment payment)
    {
        _context.Payments.Add(payment);
        var result = await _context.SaveChangesAsync();

        return result > 0 ? payment : null!;
    }

    public async Task<Payment> UpdatePayment(Payment payment)
    {
        _context.Payments.Update(payment);
        var result = await _context.SaveChangesAsync();
        return result > 0 ? payment : null!;
    }

    public async Task<Payment?> GetPaymentIdAsync(int paymentId)
    {
        return await _context.Payments.FindAsync(paymentId);
    }

    public async Task<IEnumerable<Payment>> GetPaymentByUserIdAsync(int userId)
    {
        return await _context.Payments.Where(x => x.UserId == userId).ToListAsync();
    }

    public async Task<IEnumerable<Payment>> GetAllPayment()
    {
        return await _context.Payments.ToListAsync();
    }
}