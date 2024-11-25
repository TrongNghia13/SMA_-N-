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
    public class BeginningInventoryProfile : Profile
    {
        public BeginningInventoryProfile()
        {

            CreateMap<BeginningInventory, BeginningInventoryModel>();
            CreateMap<BeginningInventoryModel, BeginningInventory>();

        }
    }
}
