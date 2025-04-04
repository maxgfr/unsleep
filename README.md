# unsleep

A simple utility tool to prevent your computer from sleeping by simulating mouse movements and clicks.

## Installation

```sh
# Install globally
npm install -g unsleep

# Or use directly with npx without installing
npx unsleep
```

## Usage

```sh
unsleep [options]
```

### Options

| Option                           | Description                                         |
| -------------------------------- | --------------------------------------------------- |
| `-V, --version`                  | Output the version number                           |
| `-a, --autoclick`                | Enable auto clicker                                 |
| `-ad, --autoclick-delay <value>` | Delay between auto clicks in ms                     |
| `-m, --mouse`                    | Enable mouse movement                               |
| `-md, --mouse-delay <value>`     | Delay between mouse movements in ms (default: 5000) |
| `-h, --help`                     | Display help information                            |

## Examples

Basic usage (default mouse movement every 5 seconds):

```sh
unsleep
```

Enable auto clicking (short and long form):

```sh
unsleep -a
unsleep --autoclick
```

Set custom delay for mouse movements (short and long form):

```sh
unsleep -m -md 10000  # Move mouse every 10 seconds
unsleep --mouse --mouse-delay 10000
```

Enable auto clicking with custom delay (short and long form):

```sh
unsleep -a -ad 3000  # Click every 3 seconds
unsleep --autoclick --autoclick-delay 3000
```

Combined options (short and long form):

```sh
unsleep -m -md 8000 -a -ad 5000
unsleep --mouse --mouse-delay 8000 --autoclick --autoclick-delay 5000
```

## Why use unsleep?

- Keep your computer awake during long downloads
- Prevent screen locking during presentations
- Bypass inactivity timeouts on various applications

## License

MIT
