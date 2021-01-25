# Software-Project
<h1 align="center"> F.R.I.C </h1>

      The Cyber Experimentation & Analysis Division (CEAD) recognizes the complexity and the time it takes to
    manage task assignments, progress, vulnerability discovery during a cyber engagement and generate custom
    reports that presents the discovered vulnerabilities and potential issues to CEAD’s target audience. They want a
    system that would aid the management of task, collection of evidence, and report generation during a cyber
    engagement.

      The University of Texas at El Paso (UTEP) and CEAD are collaborating to develop Findings and Reporting
    Information Console (FRIC) system that will provide the ability to manage task assignment and progress, and
    facilitate the collection of evidence on existing vulnerabilities, and generation of custom reports.


## Install

Note: Make sure to select the option to add to path and for DB add bin to the correct PATH.

For nodejs: https://nodejs.org/en/ | install 14.15.1 LTS

For Python: https://www.python.org/downloads/ | install 3.9

For Database: https://www.mongodb.com/try/download/community | install 4.4.2

 >  C:\Program Files\MongoDB\Server\4.4\bin

Command Prompt 1
```sh
cd FRIC/fric
npm install
```

Command Prompt 2
```sh
cd FRIC/fric/python
python -m venv venv
```
While in virtual environment
```sh
cd FRIC/fric/python/venv/Scripts/
activate.bat
pip install flask
pip install pymongo
pip install python-docx
pip install openpyxl
pip install python-pptx
pip install python-dotenv
set FLASK_APP=getAllEvents.py
set FLASK_ENV=development
```

## Usage
Command Prompt 1
```sh
npm run start
```

Command Prompt 2
```sh
cd FRIC/fric/python/venv/Scripts/
activate.bat
flask run
```

Command Prompt 3
```sh
mongo
```

## Run tests
```sh
npm run test
```

## Authors

👤 **Andrew Clanan**  Github: [@aclanan](https://github.com/aclanan)

👤 **Isaias Leos**  Github: [@IsaiasLeos](https://github.com/IsaiasLeos)

👤 **Jacob Padilla**  Github: [@JacobpaDILLAA](https://github.com/JacobpaDILLAA)

👤 **Luis Soto**  Github: [@Luis9620](https://github.com/Luis9620)

👤 **Alex Vasquez** Github: [@LXvsqz](https://github.com/LXvsqz)
