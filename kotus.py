#!/usr/bin/python
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import sys, re

#dokumenttityyppi; puuttuminen sotkee tyylit
doctype = BeautifulSoup("""
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">""", 'html.parser')

#headeri html-tiedstoon; kunhan on utf-8 & css & js, niin ok
head = BeautifulSoup("""
<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
  <meta http-equiv="MSThemeCompatible" content="No" />
  <title>ISO suomen kielioppi</title>
  <link type="text/css" href="visk.css" rel="stylesheet" />
        <link type="text/css" href="viskprint.css" rel="stylesheet" media="print" />
  <script src="viskrutiinit.js" language="JavaScript">// External file...
        </script>
        <meta name="identifier" scheme="ISSN" content="1796-041X" />
  <meta name="identifier" scheme="ISBN" content="978-952-5446-35-7" />
  <meta name="identifier" scheme="URN:ISBN" content="978-952-5446-35-7" />
</head>""", 'html.parser')

html_open = '<html>'
html_close = '</html>'

args = sys.argv[1:]

if args and args[0] == "header": print(head); quit()
if args and args[0] == "doctype": print(doctype); quit()

with open('sivu.html') as f:
   sivu = f.read()
   soppa = BeautifulSoup(sivu)
   div = soppa.find("div", {"id": "sisaltokentta"})

   #käytännössä sivuston rakenteeseen nojaavia poistoja
   poisto1 = div.find_all('div', {'class':'ed_seur_linkit'})
   for poisto in poisto1: poisto.decompose()

   poisto2 = div.find('div', {'class':'ed_linkki'})
   poisto3 = div.find('div', {'class':'seur_linkki'})
   poisto4 = div.find('div', {'class':'murupolku'})
   poisto5 = div.find('div', {'class':'ed_seur_linkit'})
   poisto6 = div.find('div', {'class':'vaakanavigaatio_footer'})
   poisto7 = div.find('div', {'class':'pykala_footer'})

   for poisto in poisto2, poisto3, poisto4, poisto5, poisto6, poisto7:
     try:
       poisto.decompose()
     except: pass

   #ul-tagissa ei ole kunnon id:tä, niin pitää hakea mutkan kautta
   pattern = re.compile('.*Pykälän kirjallisuus.*')
   all_ul = div.find_all('ul')

   for ul in all_ul:
     all_a = ul.find_all('a', text = pattern)
     all_no_link = ul.find_all('span', text = pattern)

     if all_a or all_no_link:
       ul.decompose()

   if args and args[0] == "raw":
     html = str(div)
   else: html = html_open + str(head) + str(div) + html_close

   #stdoutiin; sama olisi tallentaa tietty
   print(html)
