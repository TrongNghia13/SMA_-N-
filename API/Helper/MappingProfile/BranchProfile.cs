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
    public class BranchProfile : Profile
    {
        public BranchProfile()
        {

            CreateMap<Branch, BranchModel>();
            CreateMap<BranchModel, Branch>();

        }
    }
}
