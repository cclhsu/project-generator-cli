#*******************************************************************************
# Makefile for {{ projectName }}/{{ projectType }}
#*******************************************************************************
# Purpose:
#   This script is used to build, test, and deploy the project.
#*******************************************************************************
# Usage:
#   make [target]
#*******************************************************************************
# History:
#   2021/09/01  Clark Hsu  First release
#*******************************************************************************
#*******************************************************************************
# Variables
TOP_DIR=$(shell dirname $(abspath $(firstword $(MAKEFILE_LIST))))
GIT_PROVIDER := {{ gitProvider }}
PORJECGT_USER := {{ projectUser }}
PROJECT_NAME := {{ projectName }}

#*******************************************************************************
#*******************************************************************************
# Functions
#*******************************************************************************
#*******************************************************************************
# Main
#*******************************************************************************
.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo "Usage: make [target]"
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "	\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: init
init:  ## Initialize the project
	@echo ">>> $@ ..."
	@echo "Initialize the project"
	@echo ">>> $@ ... Done"

.PHONY: install
install:  ## Install packages for the project
	@echo ">>> $@ ..."
	@echo "Install packages for the project"
	@echo ">>> $@ ... Done"

.PHONY: update
update:  ## Update packages for the project
	@echo ">>> $@ ..."
	@echo "Update packages for the project"
	@echo ">>> $@ ... Done"

.PHONY: build
build:  ## Build the project
	@echo ">>> $@ ..."
	@echo "Build the project"
	npm run build
	@echo ">>> $@ ... Done"

.PHONY: run
run:  ## Run the project
	@echo ">>> $@ ..."
	@echo "Run the project"
	@echo ">>> $@ ... Done"

.PHONY: test
test:  ## Test the project
	@echo ">>> $@ ..."
	@echo "Test the project"
	@echo ">>> $@ ... Done"

.PHONY: lint
lint:  ## Lint the project
	@echo ">>> $@ ..."
	@echo "Lint the project"
	@echo ">>> $@ ... Done"

.PHONY: package
package:  ## Package the project
	@echo ">>> $@ ..."
	@echo "Package the project"
	npm run build
	npm pack --pack-destination bin
	@echo ">>> $@ ... Done"

.PHONY: deploy
deploy:  ## Deploy the project
	@echo ">>> $@ ..."
	@echo "Deploy the project"
	@echo ">>> $@ ... Done"

.PHONY: clean
clean:  ## Clean the project
	@echo ">>> $@ ..."
	@echo "Clean the project"
	@echo ">>> $@ ... Done"

.PHONY: helloJson
helloJson:  ## Hello Json
	@echo ">>> $@ ..."
	@echo "Hello Json"
	node ./dist/cmd.main hello -j
	@echo ">>> $@ ... Done"

.PHONY: helloString
helloString:  ## Hello String
	@echo ">>> $@ ..."
	@echo "Hello String"
	node ./dist/cmd.main hello -s
	@echo ">>> $@ ... Done"

.PHONY: userHelp
userHelp:  ## User Help
	@echo ">>> $@ ..."
	@echo "User Help"
	node ./dist/cmd.main user --help
	@echo ">>> $@ ... Done"

.PHONY: configHelp
configHelp:  ## Config Help
	@echo ">>> $@ ..."
	@echo "Config Help"
	node ./dist/cmd.main config --help
	@echo ">>> $@ ... Done"

.PHONY: goHelp
goHelp:  ## Go Help
	@echo ">>> $@ ..."
	@echo "Go Help"
	node ./dist/cmd.main go --help
	@echo ">>> $@ ... Done"

.PHONY: python3Help
python3Help:  ## Python3 Help
	@echo ">>> $@ ..."
	@echo "Python3 Help"
	node ./dist/cmd.main python3 --help
	@echo ">>> $@ ... Done"

.PHONY: rustHelp
rustHelp:  ## Rust Help
	@echo ">>> $@ ..."
	@echo "Rust Help"
	node ./dist/cmd.main rust --help
	@echo ">>> $@ ... Done"

.PHONY: typescriptHelp
typescriptHelp:  ## Typescript Help
	@echo ">>> $@ ..."
	@echo "Typescript Help"
	node ./dist/cmd.main typescript --help
	@echo ">>> $@ ... Done"

.PHONY: documentHelp
documentHelp:  ## Document Help
	@echo ">>> $@ ..."
	@echo "Document Help"
	node ./dist/cmd.main document --help
	@echo ">>> $@ ... Done"

.PHONY: projectSuiteHelp
projectSuiteHelp:  ## Project Suite Help
	@echo ">>> $@ ..."
	@echo "Project Suite Help"
	node ./dist/cmd.main project-suite --help
	@echo ">>> $@ ... Done"

.PHONY: projectHelp
projectHelp:  ## Scrum Project Help
	@echo ">>> $@ ..."
	@echo "Scrum Project Help"
	node ./dist/cmd.main project --help
	@echo ">>> $@ ... Done"

.PHONY: scrumSprintHelp
scrumSprintHelp:  ## Scrum Sprint Help
	@echo ">>> $@ ..."
	@echo "Scrum Sprint Help"
	node ./dist/cmd.main sprint --help
	@echo ">>> $@ ... Done"

.PHONY: taskHelp
taskHelp:  ## Scrum Task Help
	@echo ">>> $@ ..."
	@echo "Scrum Task Help"
	node ./dist/cmd.main task --help
	@echo ">>> $@ ... Done"

#*******************************************************************************
# EOF
#*******************************************************************************