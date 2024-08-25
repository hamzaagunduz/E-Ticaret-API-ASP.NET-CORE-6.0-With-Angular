﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Features.CQRS.Commands.CreateProduct
{
    public class CreateProductQueryRequest:IRequest<CreateProductQueryResponse>
    {
        public int stock { get; set; }
        public string name { get; set; }
        public float price { get; set; }
    }
}
