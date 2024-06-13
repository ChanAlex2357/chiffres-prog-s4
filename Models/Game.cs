namespace ChiffresApi.Models
{
    public class Game {
        public int GoldenNumber{get;set;}
        public List<int> GameNumbers{get;set;}
        public int TotalNumbers{get;set;}
        public Timer GameTimer{get;set;}

        public Game(){
            this.GoldenNumber = 786;
            this.GameNumbers = [1,2,3,4,5,6,7];
            this.TotalNumbers = 7;

            this.GameTimer = new Timer(0,1,0); 
        }
    }
}