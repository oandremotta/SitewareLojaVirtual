using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Loja.Domain.Entities
{
    public class Produto : Entity
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Image { get; set; }
        public decimal Preco { get; set; }
        public int Quantidade { get; set; }
        public bool Ativo { get; set; }
        public DateTime CriadoEm { get; set; }
        public DateTime AtualizadoEm { get; set; }
        public TipoPromocao? Promocao { get; set; }
    }

    public enum TipoPromocao
    {
        Leve2Pague1,
        TresPorDez
    }
}
