namespace ChiffresApi.Models
{
    public class Game {
        public int GoldenNumber{get;set;}
        public List<int> GameNumbers{get;set;}
        public int TotalNumbers{get;set;}
        public Timer GameTimer{get;set;}
    }
}