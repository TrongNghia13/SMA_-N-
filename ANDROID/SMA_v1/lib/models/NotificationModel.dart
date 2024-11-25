class NotificationModel {
  String? title;
  String? body;
  String? username;
  String? date;
  NotificationModel(
      {this.title,
        this.body,
      this.username,
      this.date});

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'body': body,
      'username':username,
      'date':date
    };
  }

  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    return NotificationModel(
        title: json['title'],
        body: json['body'],
      username:json['username'],
      date:json['date']
    );
  }

  @override
  String toString() {
    // TODO: implement toString
    return 'title: $title, body: $body, username: $username, date: $date';
  }
}
