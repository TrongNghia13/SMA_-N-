import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ImageSlider0201 extends StatefulWidget {
  @override
  _ImageSlider0201 createState() => _ImageSlider0201();
}

class _ImageSlider0201 extends State<ImageSlider0201> {
  int _current = 0;
  final CarouselController _controller = CarouselController();
  final List<String> imgList = [
    'assets/images/logo/img1.jpg',
    'assets/images/logo/img2.jpg',
    'assets/images/logo/img3.jpg',
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          flex: 1,
          child: CarouselSlider(
            carouselController: _controller,
            options: CarouselOptions(
              autoPlay: true,
              aspectRatio: 2.0,
              viewportFraction: 1,
              onPageChanged: (index, reason) {
                setState(() {
                  _current = index;
                });
              },
              enlargeCenterPage: true,
            ),
            items: imgList.map((item) {
              return Container(
                margin: EdgeInsets.only(left: 2, right: 2),
                child: ClipRRect(
                  borderRadius: BorderRadius.all(Radius.circular(1.0)),
                  child: Stack(
                    children: <Widget>[
                      ClipRRect(
                        borderRadius: BorderRadius.circular(15.0),
                        child: Image.asset(
                          item,
                          fit: BoxFit.cover,
                          width: 500,
                          height: 300,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
/*  Expanded(
          flex: 1,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: imgList.asMap().entries.map((entry) {
              return GestureDetector(
                onTap: () => _controller.animateToPage(entry.key),
                child: Container(
                  width: 6.0,
                  height: 6.0,
                  margin: EdgeInsets.symmetric(vertical: 8.0, horizontal: 4.0),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: (Theme.of(context).brightness == Brightness.dark
                        ? Colors.white
                        : Colors.black)
                        .withOpacity(_current == entry.key ? 0.8 : 0.4),
                  ),
                ),
              );
            }).toList(),
          ),
        ),*/
}
