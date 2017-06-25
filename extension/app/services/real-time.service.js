function RealTimeService() {
    this.weignInAPI = new WeignInAPI();
    this.cable = this.weignInAPI.actionCable;
}

RealTimeService.prototype.subscribe = function(metadata, channelHandlers) {
    this.cable.subscriptions.create(metadata, channelHandlers);
};