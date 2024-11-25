using AutoMapper;
using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helper.MappingProfile
{
    public class ProductImeiProfile : Profile
    {
        public ProductImeiProfile()
        {
            CreateMap<ProductImei, ProductImeiModel>().ReverseMap();
            CreateMap<ProductImei, ReceiptDetailVmModel>().ReverseMap();
            CreateMap<ProductImeiModel, BeginningInventory>().ReverseMap();
        }
    }
}
