using ETicaretAPI.Domain.Entites.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Domain.Entites
{
    public class File:BaseEntity
    {
        [NotMapped]
        public override DateTime UpdateTime { get => base.UpdateTime; set => base.UpdateTime = value; }

        public string FileName { get; set; }
        public string Path { get; set; }
        public string Storage { get; set; }

    }
}
