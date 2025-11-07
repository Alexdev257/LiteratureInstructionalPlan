using LIP.Domain.Entities;

namespace LIP.Application.Interface.Repository;

public interface IPaymentRepository
{
    Task<Payment> CreatePayment(Payment payment);
    Task<Payment> UpdatePayment(Payment payment);
    
    Task<Payment?> GetPaymentIdAsync(int paymentId);
    
    Task<IEnumerable<Payment>> GetPaymentByUserIdAsync(int userId);
    
    Task<IEnumerable<Payment>> GetAllPayment( );
}