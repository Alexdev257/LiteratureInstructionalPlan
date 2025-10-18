using LIP.Application.DTOs.Response;
using MediatR;

namespace LIP.Application.CQRS.Handler;

public class DumbDataCommand : IRequest<CommonReponse<string>>
{
    
}