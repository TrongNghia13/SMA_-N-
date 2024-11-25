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
    public class ReceiptImeiProfile : Profile
    {
        public ReceiptImeiProfile()
        {

            CreateMap<ReceiptImei, ReceiptImeiModel>();
            CreateMap<ReceiptImeiModel, ReceiptImei>();
            CreateMap<ReceiptImei, ReceiptImeiWithDefectDetail>().ReverseMap();

        }
    }
}
