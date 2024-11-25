class languageModel {
  final int id;
  final String flag;
  final String name;
  final String languageCode;

  languageModel(
      {required this.id,
      required this.flag,
      required this.name,
      required this.languageCode});

  static List<languageModel> languageList() {
    return <languageModel>[
      languageModel(
          id: 1, name: "Tiếng Việt", languageCode: "vi", flag: "🇻🇳"),
      languageModel(id: 2, name: "English", languageCode: "en", flag: "🇺🇸")
    ];
  }

  static String mapCodeToName(String languageCode) {
    String name = languageList()
            .where((element) => element.languageCode.contains(languageCode))
            .first
            .name +
        " " +
        languageList()
            .where((element) => element.languageCode.contains(languageCode))
            .first
            .flag;
    return name;
  }
}
