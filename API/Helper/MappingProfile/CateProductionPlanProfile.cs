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
    public class CateProductionPlanProfile : Profile
    {
        public CateProductionPlanProfile()
        {

            CreateMap<CateProductionPlan, CateProductionPlanModel>();
            CreateMap<CateProductionPlanModel, CateProductionPlan>();

        }
    }
}