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
    public class MainMenuProfile : Profile
    {
        public MainMenuProfile()
        {

            CreateMap<MainMenu, MainMenuModel>();
            CreateMap<MainMenuModel, MainMenu>();

        }
    }
}
