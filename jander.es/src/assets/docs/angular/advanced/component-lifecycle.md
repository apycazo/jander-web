The life cycle for an angular component follows:

* **constructor**
* **ngOnChanges**: This will be invoked when some *input* property is updated.
* **ngOnInit**: Right after the component is initialized, and once after the first ngOnChanges.
* **ngDoCheck**
    * **ngAfterContentInit**: All content has been included in the view
    * **ngAfterContentChecked**
    * **ngAfterViewInit**: The component view has been fully initialized
    * **ngAfterViewChecked**
* **ngOnDestroy**