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
    public class DeliveryDetailProfile : Profile
    {
        public DeliveryDetailProfile()
        {

            CreateMap<DeliveryDetail, DeliveryDetailModel>();
            CreateMap<DeliveryDetailModel, DeliveryDetail>();

        }
    }
}
