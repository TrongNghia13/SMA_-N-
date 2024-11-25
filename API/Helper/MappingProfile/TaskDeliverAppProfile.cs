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
    public class TaskDeliverAppProfile : Profile
    {
        public TaskDeliverAppProfile()
        {
            CreateMap<TaskDeliverApp, TaskDeliverAppModel>().ReverseMap();
        }
    }
}
