#!/bin/bash

#########ISO SUOMEN KIELIOPPI SCRIPT#########
#https://kaino.kotus.fi/visk/etusivu.php

#########INSTALLATION########################
#Requires Python 3 and a few other libraries

#Beautiful soup library
#sudo apt-get install python3-bs4

#Wkhtmltopdf translates html to pdf
#Download binary from: https://wkhtmltopdf.org/downloads.html

#Execute priviledges
#sudo chmod +x skripti.sh

#Run script
#./skripti.sh

#########SCRIPT##############################

#Folders
if [ ! -d "kuviot" ]; then mkdir kuviot; fi
if [ ! -d "html" ]; then mkdir html; fi
if [ ! -d "pdf" ]; then mkdir pdf; fi

#Load html files
for i in {1..1738}; do
  wget https://kaino.kotus.fi/visk/sisallys.php?p=$i -O sivu.html;
  #python3 kotus.py > output.html;
  python3 kotus.py raw > output_raw.html;
  #wkhtmltopdf output.html pdf/$i.pdf; #If you want individual pages
  #cp sivu.html html/original/$i.html;
  cp output_raw.html html/$i-raw.html;
done;

wget https://kaino.kotus.fi/visk/sisallys.php?p=koko -O sisallys.html;

#Merge html files
python3 kotus.py doctype > koko.html;
echo '<html>' >> koko.html
python3 kotus.py header >> koko.html;
python3 kotus.py table >> koko.html;

for i in {1..1738}; do
  cat html/$i-raw.html >> koko.html;
  #echo '<hr>' >> koko.html;
done;
echo '</html>' >> koko.html;

#Load css and js files
wget https://kaino.kotus.fi/visk/data/viskrutiinit.js -O viskrutiinit.js;
wget https://kaino.kotus.fi/visk/css/visk.css -O visk.css;
wget https://kaino.kotus.fi/visk/css/viskprint.css -O viskprint.css;

#Load pictures
base="https://kaino.kotus.fi/visk/kuviot";
for i in kuvio_003.png kuvio_004.png kuvio_005.png kuvio_006.png \
   kuvio_007.png kuvio_p443.png kuvio_008.png kuvio_009.png \
   kuvio_p961.png kuvio_p1005.png vaakanuolet.png kuvio_011.png \
   kuvio_012.png kuvio_013.png kuvio_p1397a.png kuvio_p1397b.png \
   kuvio_014.png kuvio_015.png kuvio_p1524a.png kuvio_p1524b.png \
   kuvio_p1524c.png kuvio_p1524d.png kuvio_p1524e.png kuvio_p1524f.png \
   kuvio_p1524g.png kuvio_p1528.png kuvio_p1530.png kuvio_p1534.png \
   kuvio_p1535.png kuvio_p1537.png kuvio_p1540.png kuvio_p1543.png \
   kuvio_p1547.png kuvio_p1548.png vaakaviiva.png kuvio_016.png;
do wget $base/$i -O kuviot/$i; done

#Create pdf
wkhtmltopdf --enable-internal-links --enable-local-file-access koko.html iso_suomen_kielioppi.pdf;
