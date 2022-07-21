#!/usr/bin/python
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import sys, re

def html_table_of_contents():
  with open('sisallys.html') as f:
    sivu = f.read()
    soppa = BeautifulSoup(sivu, features="lxml")
    div = soppa.find("div", {"id": "sisallysluettelo"})

    #create link targets (e.g. name=linkki243)
    all_otsikko = div.find_all(attrs={'class': 'pykotsikko'})
    for otsikko in all_otsikko:
      num = re.findall("\d+", otsikko.text.strip())
      otsikko['name'] = 'linkki' + str(num[0])

    #create internal link (e.g. #linkki243)
    pattern = re.compile('sisallys\.php\?p.*')
    all_links = div.find_all('a', attrs={'href': pattern})
    for link in all_links:
      num = re.findall('\d+', str(link))
      link['href'] = '#linkki' + str(num[0])

  return str(div)

def html_doctype():
  #document type; if missing, the styles won't work
  doctype = BeautifulSoup("""
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">""", 'html.parser')

  return doctype

#add html header; should be ok if utf-8, css & js is included
def html_head():
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

  return head

def html_close(): return '</html>'
def html_open(): return '<html>'

def html_page(raw):
  with open('sivu.html') as f:
    sivu = f.read()
    soppa = BeautifulSoup(sivu, features="lxml")
    div = soppa.find("div", {"id": "sisaltokentta"})

    #deletions concerning page structure
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

    #ul tag doesn't have a proper id, so it's retrieved by randomish means
    pattern = re.compile('.*Pykälän kirjallisuus.*')
    all_ul = div.find_all('ul')

    for ul in all_ul:
      all_a = ul.find_all('a', text = pattern)
      all_no_link = ul.find_all('span', text = pattern)

      if all_a or all_no_link:
        ul.decompose()

    #create link targets (e.g. name=linkki243)
    all_otsikko = div.find_all(attrs={'class': 'pykotsikko'})
    for otsikko in all_otsikko:
      num = re.findall("\d+", otsikko.text.strip())
      otsikko['name'] = 'linkki' + str(num[0])

    #create internal link (e.g. #linkki243)
    pattern = re.compile('sisallys\.php\?p.*')
    all_links = div.find_all('a', attrs={'href': pattern})
    for link in all_links:
      num = re.findall('\d+', str(link))
      link['href'] = '#linkki' + str(num[0])

    if raw:
      html = str(div)
    else: html = html_open + str(head) + str(div) + html_close

    return html

def main():
  args = sys.argv[1:]

  if args:
    if   args[0] == "header":  output = html_head()
    elif args[0] == "doctype": output = html_doctype()
    elif args[0] == "table":   output = html_table_of_contents()
    elif args[0] == "raw":     output = html_page(raw=True)
    else: output = html_page(raw=False)

    #to stdout for the main script to handle
    print(output)

if __name__ == "__main__":
    main()
