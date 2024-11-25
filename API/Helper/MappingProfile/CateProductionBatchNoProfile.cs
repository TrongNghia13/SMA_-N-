using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DATA;
using Model.Models;

namespace Helper.MappingProfile
{
    public class CateProductionBatchNoProfile :Profile
    {
        public CateProductionBatchNoProfile() {
            CreateMap<CateProductionBatchNo, CateProductionBatchNoModel>();
            CreateMap<CateProductionBatchNoModel, CateProductionBatchNo>();



        }
    }
}
