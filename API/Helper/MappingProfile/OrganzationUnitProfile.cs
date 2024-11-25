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
    public class OrganzationUnitProfile : Profile
    {
        public OrganzationUnitProfile()
        {

            CreateMap<OrganizationUnit, OrganizationUnitModel>();
            CreateMap<OrganizationUnitModel, OrganizationUnit>();
            CreateMap<OrganizationUnitTreeTable, OrganizationUnit>().ReverseMap();

        }
    }
}
