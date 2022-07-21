# Kotus 

## What?

Kotus is a cumbersome script for compiling the online version of [Iso suomen kielioppikirja](https://kaino.kotus.fi/visk/etusivu.php) to pdf.

## Installation

Install newest version of wkhtmltopdf from: https://wkhtmltopdf.org/downloads.html

```bash
python3 -m venv venv
source venv/bin/activate
python3 -m pip install -r requirements.txt
sudo chmod +x skripti.sh
```

## Running
```bash
./skripti.sh
```

