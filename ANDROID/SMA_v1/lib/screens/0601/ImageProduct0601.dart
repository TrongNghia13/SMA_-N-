import 'package:flutter/material.dart';
import 'package:sma/models/ProductImeiModel.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ImageProductRoll extends StatelessWidget {
  final List<ProductImeiModel> productImeiList;

  const ImageProductRoll({required this.productImeiList});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        padding: EdgeInsets.all(10),
        child: ListView.builder(
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          itemCount: productImeiList.length,
          itemBuilder: (context, index) {
            final productImeiModel = productImeiList[index];
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  AppLocalizations.of(context).imageProduct,
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 10),
                if (productImeiModel.image1 != null)
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: AspectRatio(
                      aspectRatio: 1.0,
                      child: ImageProduct(imageUrl: productImeiModel.image1!),
                    ),
                  ),
                SizedBox(height: 10),
                if (productImeiModel.image2 != null)
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: AspectRatio(
                      aspectRatio: 1.0,
                      child: ImageProduct(imageUrl: productImeiModel.image2!),
                    ),
                  ),
                SizedBox(height: 10),
                if (productImeiModel.image3 != null)
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: AspectRatio(
                      aspectRatio: 1.0,
                      child: ImageProduct(imageUrl: productImeiModel.image3!),
                    ),
                  ),
                SizedBox(height: 10),
                if (productImeiModel.image4 != null)
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: AspectRatio(
                      aspectRatio: 1.0,
                      child: ImageProduct(imageUrl: productImeiModel.image4!),
                    ),
                  ),
                SizedBox(height: 10),
              ],
            );
          },
        ),
      ),
    );
  }
}

class ImageProduct extends StatefulWidget {
  final String imageUrl;

  const ImageProduct({required this.imageUrl});

  @override
  State<ImageProduct> createState() => _ImageProductState();
}

class _ImageProductState extends State<ImageProduct> {
  @override
  Widget build(BuildContext context) {
    Uri? uri = Uri.tryParse(widget.imageUrl);
    if (uri != null && uri.isAbsolute && (uri.scheme == 'http' || uri.scheme == 'https')) {
      return Visibility(
        visible: true,
        child: Container(
          height: 100,
          width: 100,
          child: Image.network(
            widget.imageUrl,
            fit: BoxFit.cover,
          ),
        ),
      );
    } else if (uri != null && uri.isAbsolute && uri.scheme == 'file') {
      // Handle local file paths here
      return Visibility(
        visible: false,
        child: Container(), // Return an empty container for local paths
      );
    } else {
      return Visibility(
        visible: false,
        child: Container(), // Return an empty container for invalid or null URLs
      );
    }
  }
}
