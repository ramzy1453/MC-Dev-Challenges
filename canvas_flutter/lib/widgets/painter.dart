import 'dart:ui';

import 'package:flutter/material.dart';

class Painter extends StatefulWidget {
  const Painter({
    super.key,
  });

  @override
  State<Painter> createState() => _PainterState();
}

class _PainterState extends State<Painter> {
  List<Offset?> points = <Offset>[];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Painter'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: GestureDetector(
        onPanUpdate: (details) {
          setState(() {
            points.add(details.localPosition);
          });
        },
        onPanEnd: (details) {
          points.add(null);
        },
        child: CustomPaint(
          size: Size.infinite,
          painter: DrawingPainter(points),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            points.clear();
          });
        },
        child: const Icon(Icons.clear),
      ),
    );
  }
}

class DrawingPainter extends CustomPainter {
  const DrawingPainter(this.points);

  final List<Offset?> points;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.black
      ..strokeWidth = 4
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    if (points.isNotEmpty) {
      canvas.drawPoints(
        PointMode.points,
        points.map((e) => e!).toList(),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
