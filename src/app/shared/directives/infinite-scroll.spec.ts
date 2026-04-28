import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfiniteScroll } from './infinite-scroll';

@Component({ template: '<div appInfiniteScroll></div>', imports: [InfiniteScroll] })
class TestHost {}

describe('InfiniteScroll', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    const fixture = TestBed.createComponent(TestHost);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
