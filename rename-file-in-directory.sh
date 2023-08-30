#!/bin/bash

# Function to rename files
rename_files() {
    for file in "$1"/*; do
        if [[ -d "$file" ]]; then
            # Recursive call for subdirectories
            rename_files "$file"
        else
            # Check if the file name contains "metric"
            if [[ "$file" == *"metric"* ]]; then
                new_file="${file/metric/message}"
                mv "$file" "$new_file"
                echo "Renamed: $file -> $new_file"
            fi
        fi
    done
}

# Replace 'path_to_directory' with the actual path to your directory
path_to_directory="/Users/clark.hsu/src/myProject/project-suite/project-suite-cli/src/scrum/message"

# Call the rename_files function with the directory path
rename_files "$path_to_directory"