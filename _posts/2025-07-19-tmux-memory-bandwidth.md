---
title:  "Adding Memory Bandwidth Monitor to Tmux Powerline"
subtitle: ""
tag: "Linux"
layout: post
excerpt: "Records of how to add customized segments to tmux powerline."
toc: true
---

# Adding Memory Bandwidth Monitor to Tmux Powerline

## Using `pcm` to Monitor Memory Bandwidth

`pcm-memory` is a tool that can be used to monitor memory bandwidth in Linux. It is part of the `pcm` (Performance Counter Monitor) suite, which provides various performance monitoring capabilities.

With `pcm` tools installed, we can setup a script to monitor memory bandwidth.
I save it to `/usr/local/bin/monitor-memory`:

```bash
#!/bin/bash
# monitor-memory - Memory bandwidth monitor using Intel PCM
# This script runs pcm-memory with sudo privileges

# Check if pcm-memory is available
if ! command -v pcm-memory &> /dev/null; then
    echo "Error: pcm-memory not found. Please install Intel PCM toolkit."
    exit 1
fi

# Check if running as root
if [[ "$EUID" -ne 0 ]]; then
    echo "Error: This script must be run as root."
    exit 1
fi

# Run pcm-memory with specified parameters
# -s: silent mode, no verbose output
# -csv: output in CSV format
# -nc: suppress detailed channel info
# -- sleep: workaround to run pcm-memory once
sudo pcm-memory -s -csv -nc -- sleep 0.01

# Note: The output format from pcm-memory typically includes many columns.
# The last three values should be read, write, total bandwidth in MB/s
```

## Setting `sudo` Permissions for `monitor-memory`

We want the `monitor-memory` script to be executable without entering a password with root privileges.

To do this, we can edit the sudoers file:

```bash
ALL ALL=(ALL) NOPASSWD: /usr/local/bin/monitor-memory
```

## Adding Memory Bandwidth Segment to Tmux Powerline
Now we can add a segment to the tmux powerline to display memory bandwidth.

We add a new segment script to `~/.config/tmux-powerline/segments/memory_bandwidth.sh`:

```bash
#!/usr/bin/env bash
# memory_bandwidth.sh - Tmux-powerline segment for memory bandwidth monitoring using Intel PCM

# Source tmux-powerline lib functions
TMUX_POWERLINE_DIR_LIB="$HOME/.tmux/plugins/tmux-powerline/lib"

source "${TMUX_POWERLINE_DIR_LIB}/tmux_adapter.sh"

TMUX_POWERLINE_SEG_MEMORY_BANDWIDTH_MONITOR_SCRIPT_DEFAULT="/usr/local/bin/monitor-memory"

generate_segmentrc() {
    read -d '' rccontents  << EORC
# Memory bandwidth segment for tmux-powerline using Intel PCM

# Path to the monitor-memory script
export TMUX_POWERLINE_SEG_MEMORY_BANDWIDTH_MONITOR_SCRIPT="${TMUX_POWERLINE_SEG_MEMORY_BANDWIDTH_MONITOR_
SCRIPT_DEFAULT}"
EORC
    echo "${rccontents}"
}

__process_settings() {
    if [[ -z "$TMUX_POWERLINE_SEG_MEMORY_BANDWIDTH_MONITOR_SCRIPT" ]]; then
        export TMUX_POWERLINE_SEG_MEMORY_BANDWIDTH_MONITOR_SCRIPT="${TMUX_POWERLINE_SEG_MEMORY_BANDWIDTH_
MONITOR_SCRIPT_DEFAULT}"
    fi
}

run_segment() {
    __process_settings

    # Check if monitor script exists and is executable
    if [[ ! -x "$TMUX_POWERLINE_SEG_MEMORY_BANDWIDTH_MONITOR_SCRIPT" ]]; then
        echo "123"
        return
    fi

    # Get bandwidth data
    local bandwidth_data
    bandwidth_data=$(sudo $TMUX_POWERLINE_SEG_MEMORY_BANDWIDTH_MONITOR_SCRIPT 2>/dev/null)
    local exit_code=$?

    if [[ $exit_code -ne 0 || -z "$bandwidth_data" ]]; then
        return
    fi

    # Now split the line by commas and extract the last 3 fields
    local data_line=$(echo "$bandwidth_data" | tail -n 1)
    IFS=',' read -r -a fields <<< "$data_line"

    # Get total number of fields
    local num_fields=${#fields[@]}

    # Extract last three values
    local read_bw=$(echo "${fields[$((num_fields-3))]}" | xargs)
    local write_bw=$(echo "${fields[$((num_fields-2))]}" | xargs)
    local total_bw=$(echo "${fields[$((num_fields-1))]}" | xargs)

    # Use consistent colors - no color changes based on bandwidth
    local bg_color="colour235"  # dark gray
    local fg_color="colour255"  # white

    # Simple format: 💾↓1234MB/s↑567MB/s
    content="💾 ↓ ${read_bw} ↑ ${write_bw}"

    echo "${content}"
    return 0
}

# Check if this script is being sourced or executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    # Being executed directly, run the segment
    run_segment
fi
```

setting the permissions to allow execution and we can test the output:

```bash
$ ./memory-bandwidth.sh
💾 ↓ 481.66 ↑ 587.30
```

and we are ready to add it to the tmux powerline.

## Adding to Tmux Powerline Configuration

Now, modifying the configuration of tmux powerline `~/.config/tmux-powerline/themes/default.sh` to include the new segment:

```bash
if [ -z "$TMUX_POWERLINE_LEFT_STATUS_SEGMENTS" ]; then
    TMUX_POWERLINE_LEFT_STATUS_SEGMENTS=(
        "tmux_session_info 148 234"
        "hostname 33 0"
        # ...
        "memory-bandwidth 90 255"   # Add memory bandwidth segment anywhere you like!
        # ...

        "vcs_others 245 0"
    )
fi
```

Of course you can adjust the colors to your favorite ones.

## Notes

Simple and quick, we are done! Setting up more monitors makes the tmux powerline more informative and useful.

Disclaimer: This post is only for fun and testing purpose. Part of the code examples and the text in this post are generated by Claude 4.
