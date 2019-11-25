export default class Char{
    constructor(conf){
        console.log(conf);
        this.conf = conf;
        this.socket = new WebSocket('wss://fep-app.herokuapp.com/');
        this.onopen(conf.name);
        this.onmessage();
    }

    send(name, type, message) {
        this.socket.send(
            JSON.stringify({
                name,
                type,
                message
            })
        );
    }

    message(name, type, message) {
        this.send(name, type, message);
    }

    onopen(name){
        this.socket.onopen = () => this.send(name, 'connected', 'Connected');
        
    }
    
    onerror(){
        this.socket.error = ()=> {
            console.error("WebSocket error observed:", e.data);
        }
    };
    
    onmessage(){
        this.socket.onmessage = e => {
            const data = JSON.parse(e.data);
            this.conf.onmessage(data);
            
        };
    }
}
