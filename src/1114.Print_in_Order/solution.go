package print_in_order

type Foo struct {
	second chan struct{}
	third  chan struct{}
}

func NewFoo() *Foo {
	foo := &Foo{
		second: make(chan struct{}, 1),
		third:  make(chan struct{}, 1),
	}

	return foo
}

func (f *Foo) First(printFirst func()) {
	// Do not change this line
	printFirst()
	close(f.second)
}

func (f *Foo) Second(printSecond func()) {
	/// Do not change this line
	<-f.second
	printSecond()
	close(f.third)
}

func (f *Foo) Third(printThird func()) {
	// Do not change this line
	<-f.third
	printThird()
	f.first <- struct{}{}
}
