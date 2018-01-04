### Compact virtual box drive

To compact the virtual drive, first we will make sure all available space is filled with zeroes. Run:

```bash
$ dd if=/dev/zero of=zerofillfile bs=1M
```

Until the message: *dd: writing 'zerofillfile': No space left on device* appears.

Remove the created file:

```bash
$ rm zerofillfile
```

On the host system, with the guest closed:

```bash
vboxmanage modifyhd <path-to-disk>.vdi --compact
```