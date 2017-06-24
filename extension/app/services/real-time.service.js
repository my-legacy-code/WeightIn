function RealTimeService() {
    let serverName = 'localhost';
    let serverPort = 3000;
    let serverNamePort = serverName + ':' + serverPort;
    this.serverURL = 'http://' + serverNamePort;
    this.webSocketURI = 'ws://' + serverNamePort;
    ActionCable.startDebugging();
    this.cable = ActionCable.createConsumer(this.webSocketURI + '/cable');
}

RealTimeService.prototype.subscribe = function(metadata, channelHandlers) {
    this.cable.subscriptions.create(metadata, channelHandlers);
};