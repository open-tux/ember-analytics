<%= importStatement %>

export default <%= baseClass %>.extend({

  trackEvent(id, options={}) {
    const param = this.getParam(options, id);

    // Implement logic to fire event
  },

  trackPage(options={}) {
    const param = this.getParam(options, id);

    // Implement logic to fire event
  }
});
